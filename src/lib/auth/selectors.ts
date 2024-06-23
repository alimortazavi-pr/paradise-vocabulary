//Types
import { IAuthFrom } from "@/common/interfaces";
import { RootState } from "@/lib";

export function authFormSelector(state: RootState): IAuthFrom {
  return state.auth.authForm;
}

export function mobileAuthFormSelector(state: RootState): string {
  return state.auth.authForm.mobile;
}

export function passwordAuthFormSelector(state: RootState): string {
  return state.auth.authForm.password;
}
