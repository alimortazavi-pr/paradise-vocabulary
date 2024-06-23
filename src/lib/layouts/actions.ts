import { AppThunk } from "@/lib";

//Actions of other reducers

//Reducer
import { layoutsReducer } from ".";

//Actions from reducer
export const { setDarkMode } = layoutsReducer.actions;

//Interfaces

//Utils
import { storage } from "@/common/utils";

//Actions from actions
export function darkModeCheckerAction(): AppThunk {
  return async (dispatch) => {
    try {
      const darkMode = storage.getDarkMode();
      darkMode
        ? document.querySelector("html")?.classList.add("dark")
        : document.querySelector("html")?.classList.add("light");
      dispatch(setDarkMode(darkMode));
    } catch (error) {
      console.log(error);
    }
  };
}

export function darkModeToggleAction(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const darkMode = getState().layouts.darkMode;
      storage.setDarkMode((!darkMode).toString());
      darkMode
        ? document.querySelector("html")?.classList.remove("dark")
        : document.querySelector("html")?.classList.add("dark");
      dispatch(setDarkMode(!darkMode));
    } catch (error) {
      console.log(error);
    }
  };
}
