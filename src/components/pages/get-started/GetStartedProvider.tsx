"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Key } from "react";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { isSigningUpSelector } from "@/lib/auth/selectors";

//Components
import { AuthContainer } from "./AuthContainer";
import { setIsSigningUp } from "@/lib/auth/actions";

export const GetStartedProvider = () => {
  //Redux
  const dispatch = useAppDispatch();
  const isSigningUp = useAppSelector(isSigningUpSelector);

  //Functions
  async function toggleIsSigningUpFunc(key: Key) {
    if (key === "sign-up") {
      await dispatch(setIsSigningUp(true));
    } else if (key === "sign-in") {
      await dispatch(setIsSigningUp(false));
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen p-2">
      <div className="w-full text-center max-w-md bg-white min-h-96 flex flex-col justify-between rounded-3xl p-5">
        <h4 className="text-4xl my-10">Welcome</h4>
        <Tabs
          size="lg"
          aria-label="auth-page"
          className="mb-3 w-full"
          classNames={{
            tabList: "w-full",
          }}
          selectedKey={isSigningUp ? "sign-up" : "sign-in"}
          onSelectionChange={toggleIsSigningUpFunc}
        >
          <Tab key="sign-up" title="Sign Up" />
          <Tab key="sign-in" title="Sign In" />
        </Tabs>
        <AuthContainer />
      </div>
    </div>
  );
};
