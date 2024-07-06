import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { IProfileState } from "@/common/interfaces";

//Reducers
import reducers from "@/lib/profile/reducers";

const initialState: IProfileState = {
  user: {
    _id: "",
    createdBy: "",
    firstName: "",
    lastName: "",
    mobile: "",
    profileImage: "",
    mobileActive: false,
    password: "",
    deleted: false,
  },
};

export const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers,
});

export default profileReducer.reducer;
