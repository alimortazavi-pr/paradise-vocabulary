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
export const LastNameInput: FC<IProps> = ({ form, setForm }) => {
  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setError({ status: true, message: "Please fill the last name field" });
    } else {
      setForm({
        ...form,
        lastName: e.target.value,
      });
    }
  }

  return (
    <Input
      type="text"
      label="Last Name"
      onChange={onChangeHandler}
      value={form.lastName}
      isInvalid={error.status}
      errorMessage={error.message}
      className="mb-3"
    />
  );
};
