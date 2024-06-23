"use client";

import { Input } from "@nextui-org/react";
import { ChangeEvent, FC } from "react";

//Types
import { ICreateAndEditComponentsWords } from "@/common/interfaces";

//Redux

export const EnglishInput: FC<ICreateAndEditComponentsWords> = ({
  word,
  setWord,
}) => {
  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setWord((prev) => ({ ...prev, english: e.target.value }));
  }

  return (
    <Input
      className="mb-3"
      type="text"
      label="English"
      onChange={onChangeHandler}
      value={word.english}
    />
  );
};
