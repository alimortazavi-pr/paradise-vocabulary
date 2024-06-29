import { AppThunk } from "@/lib";
import axios from "axios";

//Reducer
import { authReducer } from ".";

//Actions from reducer
export const { setAuthForm, setToken, setUser } = authReducer.actions;

//Interfaces

//Utils
import { storage } from "@/common/utils";

//Actions from other libs
import { setIsLoading } from "../layouts/actions";

//Actions from actions
export function checkToken(): AppThunk {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const token = storage.getToken();
      if (token) {
        const res = await axios.get("/api/get-started", {
          headers: {
            token,
          },
        });
        dispatch(setToken(token));
        dispatch(setUser({ mobile: res.data.user }));
        dispatch(setIsLoading(false));
      } else {
        throw new Error("Token not found");
      }
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function setMobileAuthAction(mobile: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(
        setAuthForm({ mobile, password: getState().auth.authForm.password })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function setPasswordAuthAction(password: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(
        setAuthForm({
          mobile: getState().auth.authForm.mobile,
          password: password,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function authSubmitAction(): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post("/api/get-started", {
        mobile: getState().auth.authForm.mobile,
        password: getState().auth.authForm.password,
      });
      storage.setToken(res.data.token);
      dispatch(setToken(res.data.token));
      dispatch(setUser({ mobile: getState().auth.authForm.mobile }));
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));

      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function logOutAction(): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      await storage.removeToken();
      await dispatch(setToken(undefined));
      await dispatch(setUser(undefined));
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}
