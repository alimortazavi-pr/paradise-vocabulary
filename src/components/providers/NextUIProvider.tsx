"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import { NextUIProvider as NxUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { darkModeCheckerAction } from "@/lib/layouts/actions";

export const NextUIProvider: FC<PropsWithChildren> = ({ children }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Life cycle
  useEffect(() => {
    dispatch(darkModeCheckerAction());
  }, []);

  return (
    <NxUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NxUIProvider>
  );
};
