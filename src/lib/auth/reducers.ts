//Types
import { IAuthFrom, IAuthState, IUser } from "@/common/interfaces";
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
  setToken(
    state: IAuthState,
    action: PayloadAction<string | undefined>
  ): IAuthState {
    return {
      ...state,
      token: action.payload,
    };
  },
  setUser(
    state: IAuthState,
    action: PayloadAction<IUser | undefined>
  ): IAuthState {
    return {
      ...state,
      user: action.payload,
    };
  },
};

export default reducers;
