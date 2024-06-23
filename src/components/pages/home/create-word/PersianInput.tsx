"use client";

import { Input } from "@nextui-org/react";
import { ChangeEvent, FC } from "react";

//Types
import { ICreateAndEditComponentsWords } from "@/common/interfaces";

//Redux

export const PersianInput: FC<ICreateAndEditComponentsWords> = ({
  word,
  setWord,
}) => {
  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setWord((prev) => ({ ...prev, persian: e.target.value }));
  }

  return (
    <Input
      className="mb-3"
      type="text"
      label="Persian"
      onChange={onChangeHandler}
      value={word.persian}
      dir="rtl"
    />
  );
};
