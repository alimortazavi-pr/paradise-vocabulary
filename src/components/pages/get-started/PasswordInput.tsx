"use client";

import { Input } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import convertToPersian from "num-to-persian";
import convertAPToEnglish from "ap-to-english";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { passwordAuthFormSelector } from "@/lib/auth/selectors";
import { setPasswordAuthAction } from "@/lib/auth/actions";

export const PasswordInput = () => {
  //Redux
  const dispatch = useAppDispatch();
  const password = useAppSelector(passwordAuthFormSelector);

  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value || e.target.value.length < 6) {
      setError({
        status: true,
        message: "The password must be at least 6 characters",
      });
      dispatch(setPasswordAuthAction(e.target.value));
    } else {
      setError({ status: false, message: "" });
      dispatch(setPasswordAuthAction(e.target.value));
    }
  }

  return (
    <Input
      className="mb-3"
      type="password"
      label="Password"
      onChange={onChangeHandler}
      value={password}
      isInvalid={error.status}
      errorMessage={error.message}
    />
  );
};
