"use client";

import { FC, useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";

//Types
import { IWord } from "@/common/interfaces";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setWords } from "@/lib/words/actions";
import { wordsSelector } from "@/lib/words/selectors";

//Components
import { SingleWord } from "./SingleWord";
import { EditWordModal } from "../create-and-edit-word";

interface IProps {
  words: IWord[];
}
export const WordListContainer: FC<IProps> = ({ words }) => {
  //Redux
  const dispatch = useAppDispatch();
  const wordsGlobal = useAppSelector(wordsSelector);

  //NextUI
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //Life cycle
  useEffect(() => {
    if (words) {
      dispatch(setWords(words));
    }
  }, [words]);

  return (
    <>
      <div className="p-2 grid grid-cols-12 gap-2">
        {wordsGlobal?.map((word) => (
          <SingleWord word={word} key={word._id} />
        ))}
      </div>
      <EditWordModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};
