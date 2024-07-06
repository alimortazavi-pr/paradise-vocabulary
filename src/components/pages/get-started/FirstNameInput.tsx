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
export const FirstNameInput: FC<IProps> = ({ form, setForm }) => {
  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError({ status: true, message: "Please fill the first name field" });
    } else {
      setForm({
        ...form,
        firstName: e.target.value,
      });
    }
  }

  return (
    <Input
      type="text"
      label="First Name"
      onChange={onChangeHandler}
      value={form.firstName}
      isInvalid={error.status}
      errorMessage={error.message}
      className="mb-3"
    />
  );
};
