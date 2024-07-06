"use client";

import { useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";
import { toast } from "react-toastify";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllUserWords } from "@/lib/words/actions";
import { wordsSelector } from "@/lib/words/selectors";
import { isAuthSelector } from "@/lib/auth/selectors";

//Components
import { SingleWord } from "./SingleWord";
import { EditWordModal } from "../create-and-edit-word";

export const WordListContainer = () => {
  //Redux
  const dispatch = useAppDispatch();
  const words = useAppSelector(wordsSelector);
  const isAuth = useAppSelector(isAuthSelector);

  //NextUI
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //Life cycle
  useEffect(() => {
    if (isAuth) {
      getAllUserWordsFunc();
    }
  }, [isAuth]);

  //Functions
  async function getAllUserWordsFunc() {
    try {
      await dispatch(getAllUserWords());
    } catch (error: any) {
      if (error.message != "jwt malformed") {
        toast.error(error.message, { position: "top-center" });
      }
    }
  }

  return (
    <>
      <div className="p-2 grid grid-cols-12 gap-2">
        {words?.map((word) => (
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
