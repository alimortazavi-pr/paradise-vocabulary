"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { checkToken } from "@/lib/auth/actions";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //Lifecycle
  useEffect(() => {
    checkTokenFunc();
  }, []);

  //Functions
  async function checkTokenFunc() {
    try {
      await dispatch(checkToken());
    } catch (error: any) {
      router.push("/get-started");
    }
  }

  return <>{children}</>;
};
