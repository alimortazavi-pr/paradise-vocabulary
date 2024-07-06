import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IAuthState } from "@/common/interfaces";

//Utils
import { storage } from "@/common/utils";

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
    storage.removeUserAuthorization();
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
