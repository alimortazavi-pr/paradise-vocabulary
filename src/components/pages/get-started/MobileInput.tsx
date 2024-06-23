"use client";

import { Input } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import convertAPToEnglish from "ap-to-english";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { mobileAuthFormSelector } from "@/lib/auth/selectors";
import { setMobileAuthAction } from "@/lib/auth/actions";

export const MobileInput = () => {
  //Redux
  const dispatch = useAppDispatch();
  const mobile = useAppSelector(mobileAuthFormSelector);

  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value || e.target.value.length < 11) {
      setError({ status: true, message: "Mobile format is incorrect" });
      dispatch(
        setMobileAuthAction(
          convertAPToEnglish(e.target.value.replace(/\,/g, ""))
        )
      );
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else if (e.target.value.length > 11) {
      return;
    } else {
      setError({ status: false, message: "" });
      dispatch(
        setMobileAuthAction(
          convertAPToEnglish(e.target.value.replace(/\,/g, ""))
        )
      );
    }
  }

  return (
    <Input
      type="text"
      label="Mobile"
      onChange={onChangeHandler}
      value={mobile}
      isInvalid={error.status}
      errorMessage={error.message}
      className="mb-3"
    />
  );
};
