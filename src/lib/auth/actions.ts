import { AppThunk } from "@/lib";

//Actions of other store
import { setProfile } from "@/lib/profile/actions";
import { setIsLoading } from "../layouts/actions";

//Reducer
import { authReducer } from "@/lib/auth";

//Actions from reducer
export const { authenticate, setDidTryAutoLogin, logOut, setIsSigningUp } =
  authReducer.actions;

//Interfaces
import { IAuthForm } from "@/common/interfaces";

//Tools
import api from "@/services/axiosInstance";
import Cookies from "js-cookie";

//Actions from actions
export function autoLogin(token: string): AppThunk {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await api.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        authenticate({
          token: token,
        })
      );
      dispatch(setProfile(res.data.user));
      dispatch(setIsLoading(false));
    } catch (err: any) {
      if (
        err.response?.status === 403 ||
        err.response?.status === 401 ||
        err.response?.data?.message === "invalid token"
      ) {
        dispatch(logOut());
      } else {
        console.log(err);
      }
      dispatch(setIsLoading(false));
    }
  };
}

export function checkMobileExist(mobile: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await api.post("/auth/check-mobile-exist", { mobile });
      return res.data.isMustRegister;
    } catch (err: any) {
      dispatch(setIsLoading(false));
      throw new Error(err.response.data.message);
    }
  };
}

export function requestNewCode(mobile: string): AppThunk {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await api.post("/auth/request-code", { mobile });
      dispatch(setIsLoading(false));
    } catch (err: any) {
      dispatch(setIsLoading(false));
      throw new Error(err.response.data.message);
    }
  };
}

export function signUp(form: IAuthForm): AppThunk {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await api.post("/auth/register", form);
      dispatch(
        authenticate({
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.user));
      saveDataToLocal(res.data.token, res.data.user);
      dispatch(setIsLoading(false));
    } catch (err: any) {
      dispatch(setIsLoading(false));
      throw new Error(err.response.data.message);
    }
  };
}

export function signIn(form: IAuthForm): AppThunk {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await api.post("/auth/login", form);
      dispatch(
        authenticate({
          user: res.data.user,
          token: res.data.token,
        })
      );
      dispatch(setProfile(res.data.user));
      saveDataToLocal(res.data.token, res.data.user);
      dispatch(setIsLoading(false));
    } catch (err: any) {
      dispatch(setIsLoading(false));
      throw new Error(err.response.data.message);
    }
  };
}

//Functions
export function saveDataToLocal(token: string, user: object) {
  Cookies.set(
    "userAuthorization",
    JSON.stringify({
      token: token,
      user: user,
    }),
    { expires: 90 }
  );
}
