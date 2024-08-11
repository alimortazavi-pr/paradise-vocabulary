"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { didTryAutoLoginSelector } from "@/lib/auth/selectors";
import { autoLogin } from "@/lib/auth/actions";

//Utils
import { storage } from "@/common/utils";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();
  const didTryAutoLogin = useAppSelector(didTryAutoLoginSelector);

  //Next
  const router = useRouter();

  //Lifecycle
  useEffect(() => {
    autoLoginFunc();
  }, [dispatch, didTryAutoLogin]);

  //Functions
  async function autoLoginFunc() {
    const userAuthorization = storage.getUserAuthorization();
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
