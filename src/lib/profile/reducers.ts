import { PayloadAction } from "@reduxjs/toolkit";

//Interfaces
import { IProfile, IProfileState } from "@/common/interfaces";

//Tools

const reducers = {
  setProfile: (
    state: IProfileState,
    action: PayloadAction<IProfile>
  ): IProfileState => {
    return {
      ...state,
      user: action.payload,
    };
  },
};

export default reducers;
