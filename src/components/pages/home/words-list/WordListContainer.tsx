"use client";

import { useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllUserWords } from "@/lib/words/actions";
import { wordsSelector } from "@/lib/words/selectors";

//Components
import { SingleWord } from "./SingleWord";
import { EditWordModal } from "../create-and-edit-word";
import { toast } from "react-toastify";

export const WordListContainer = () => {
  //Redux
  const dispatch = useAppDispatch();
  const words = useAppSelector(wordsSelector);

  //NextUI
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //Life cycle
  useEffect(() => {
    getAllUserWordsFunc();
  }, []);

  //Functions
  async function getAllUserWordsFunc() {
    try {
      await dispatch(getAllUserWords());
    } catch (error: any) {
      if (error.message != "Token is null") {
        toast.error(error.message, { position: "top-center" });
      }
    }
  }

  return (
    <>
      <div className="p-2 grid grid-cols-12 gap-2">
        {words?.map((word) => (
          <SingleWord word={word} key={word.id} />
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
