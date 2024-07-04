//Types
import { ILayoutsState } from "@/common/interfaces/layouts";
import { PayloadAction } from "@reduxjs/toolkit";

//Tools
import { storage } from "@/common/utils";

const reducers = {
  setDarkMode(
    state: ILayoutsState,
    action: PayloadAction<boolean>
  ): ILayoutsState {
    return {
      ...state,
      darkMode: action.payload,
    };
  },
  setIsLoading(
    state: ILayoutsState,
    action: PayloadAction<boolean>
  ): ILayoutsState {
    return {
      ...state,
      isLoading: action.payload,
    };
  },
  setIsVisibleTranslator(state: ILayoutsState, action: PayloadAction<boolean>) {
    return {
      ...state,
      isVisibleTranslator: action.payload,
    };
  },
};

export default reducers;
