import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IAuthState } from "@/common/interfaces";

//Tools
import Cookies from "js-cookie";

const reducers = {
  authenticate: (state: IAuthState, action: PayloadAction<any>): IAuthState => {
    return {
      ...state,
      token: action.payload.token,
      didTryAutoLogin: true,
      isAuth: true,
    };
  },
  setDidTryAutoLogin: (state: IAuthState): IAuthState => {
    return {
      ...state,
      didTryAutoLogin: true,
    };
  },
  logOut: (state: IAuthState): IAuthState => {
    Cookies.remove("userAuthorization");
    return {
      ...state,
      didTryAutoLogin: true,
      isAuth: false,
    };
  },
  setIsSigningUp: (
    state: IAuthState,
    action: PayloadAction<boolean>
  ): IAuthState => {
    return {
      ...state,
      isSigningUp: action.payload,
    };
  },
};

export default reducers;
