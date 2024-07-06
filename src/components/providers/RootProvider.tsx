"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { didTryAutoLoginSelector } from "@/lib/auth/selectors";
import { autoLogin } from "@/lib/auth/actions";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();
  const didTryAutoLogin = useAppSelector(didTryAutoLoginSelector);

  //Lifecycle
  useEffect(() => {
    autoLoginFunc();
  }, [dispatch, didTryAutoLogin]);

  //Functions
  async function autoLoginFunc() {
    const userAuthorization = Cookies.get("userAuthorization");
    if (userAuthorization && !didTryAutoLogin) {
      const transformedData = JSON.parse(userAuthorization);
      try {
        dispatch(autoLogin(transformedData.token));
      } catch (err: any) {
        router.push("/get-started");
        console.log(err);
      }
    } else if (!userAuthorization) {
      router.push("/get-started");
    }
  }

  return <>{children}</>;
};
