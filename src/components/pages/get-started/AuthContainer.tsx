"use client";

//Components

//Redux
import { isSigningUpSelector } from "@/lib/auth/selectors";
import { useAppSelector } from "@/lib/hooks";
import { SignUpFormContainer } from "./SignUpFormContainer";
import { SignInFormContainer } from "./SignInFormContainer";

export const AuthContainer = () => {
  //Redux
  const isSigningUp = useAppSelector(isSigningUpSelector);

  return (
    <div>{isSigningUp ? <SignUpFormContainer /> : <SignInFormContainer />}</div>
  );
};
