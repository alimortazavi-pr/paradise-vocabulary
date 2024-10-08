"use client";

import { Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import convertAPToEnglish from "ap-to-english";

//Types
import { IAuthForm } from "@/common/interfaces";

interface IProps {
  form: IAuthForm;
  setForm: Dispatch<SetStateAction<IAuthForm>>;
}
export const MobileInput: FC<IProps> = ({ form, setForm }) => {
  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value || e.target.value.length < 11) {
      setError({ status: true, message: "Mobile format is incorrect" });
      setForm({
        ...form,
        mobile: convertAPToEnglish(e.target.value.replace(/\,/g, "")),
      });
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else if (e.target.value.length > 11) {
      return;
    } else {
      setError({ status: false, message: "" });
      setForm({
        ...form,
        mobile: convertAPToEnglish(e.target.value.replace(/\,/g, "")),
      });
    }
  }

  return (
    <Input
      type="text"
      label="Mobile"
      onChange={onChangeHandler}
      value={form.mobile}
      isInvalid={error.status}
      errorMessage={error.message}
      className="mb-3"
    />
  );
};
