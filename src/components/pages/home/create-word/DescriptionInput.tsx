"use client";

import { Textarea } from "@nextui-org/react";
import { ChangeEvent, FC } from "react";

//Types
import { ICreateAndEditComponentsWords } from "@/common/interfaces";

//Redux

export const DescriptionInput: FC<ICreateAndEditComponentsWords> = ({
  word,
  setWord,
}) => {
  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setWord((prev) => ({ ...prev, description: e.target.value }));
  }

  return (
    <Textarea
      label="Description"
      value={word.description}
      onChange={onChangeHandler}
    />
  );
};
