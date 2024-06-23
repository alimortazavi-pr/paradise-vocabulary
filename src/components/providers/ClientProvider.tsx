"use client";

import { FC, PropsWithChildren, Suspense } from "react";

//Components
import { NextUIProvider } from "./NextUIProvider";
import { ReduxProvider } from "./ReduxProvider";

export const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReduxProvider>
      <NextUIProvider>
        <Suspense fallback={<div>Loading ...</div>}>{children}</Suspense>
      </NextUIProvider>
    </ReduxProvider>
  );
};
