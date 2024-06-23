//Types
import { RootState } from "@/lib";

export function darkModeSelector(state: RootState): boolean {
  return state.layouts.darkMode;
}

export function isLoadingSelector(state: RootState): boolean {
  return state.layouts.isLoading;
}
