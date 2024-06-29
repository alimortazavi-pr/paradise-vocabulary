import { AppThunk } from "@/lib";
import axios from "axios";
import convertAPToEnglish from "ap-to-english";

//Reducer
import { authReducer } from ".";

//Actions from reducer
export const { setAuthForm, setToken } = authReducer.actions;

//Interfaces

//Utils
import { storage } from "@/common/utils";

//Actions from actions
export function checkToken(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const token = storage.getToken();
      if (token) {
        const res = await axios.get("/api/get-started", {
          headers: {
            token,
          },
        });
        dispatch(setToken(token));
        dispatch(setAuthForm({ mobile: res.data.user, password: "" }));
      } else {
        throw new Error("Token not found");
      }
    } catch (error: any) {
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
      const res = await axios.post("/api/get-started", {
        mobile: getState().auth.authForm.mobile,
        password: getState().auth.authForm.password,
      });
      storage.setToken(res.data.token);
      dispatch(setToken(res.data.token));
    } catch (error: any) {
      throw new Error(error?.response?.data || error.message);
    }
  };
}
