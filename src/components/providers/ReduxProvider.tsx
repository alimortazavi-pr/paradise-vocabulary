"use client";

import { FC, PropsWithChildren, useEffect, useRef } from "react";

//Redux
import { AppStore, makeStore } from "@/lib";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
