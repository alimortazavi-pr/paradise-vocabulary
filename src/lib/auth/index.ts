import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IAuthState } from "@/common/interfaces";

//Reducers
import reducers from "@/lib/auth/reducers";

const initialState: IAuthState = {
  token: null,
  didTryAutoLogin: false,
  isAuth: false,
  isSigningUp: false,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export default authReducer.reducer;
