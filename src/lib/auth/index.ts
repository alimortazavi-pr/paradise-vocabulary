import { createSlice } from "@reduxjs/toolkit";

//Types
import { IAuthState } from "@/common/interfaces";

//Reducers
import reducers from "@/lib/auth/reducers";

const initialState: IAuthState = {
  authForm: {
    mobile: "",
    password: "",
  },
  token: undefined,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export default authReducer.reducer;
