//Types
import { IAuthFrom, IAuthState } from "@/common/interfaces/auth";
import { PayloadAction } from "@reduxjs/toolkit";

//Tools
import { storage } from "@/common/utils";

const reducers = {
  setAuthForm(state: IAuthState, action: PayloadAction<IAuthFrom>): IAuthState {
    return {
      ...state,
      authForm: {
        mobile: action.payload.mobile,
        password: action.payload.password,
      },
    };
  },
  setToken(state: IAuthState, action: PayloadAction<string>): IAuthState {
    return {
      ...state,
      token: action.payload,
    };
  },
};

export default reducers;
