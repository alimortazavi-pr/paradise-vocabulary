import { RootState } from "@/lib";

//Interfaces

export function isAuthSelector(state: RootState): boolean {
  return state.auth.isAuth;
}

export function didTryAutoLoginSelector(state: RootState): boolean {
  return state.auth.didTryAutoLogin;
}

export function tokenSelector(state: RootState): string | null {
  return state.auth.token;
}

export function isSigningUpSelector(state: RootState): boolean {
  return state.auth.isSigningUp;
}