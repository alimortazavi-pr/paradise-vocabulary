"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

//Types
import { INextUIModalProps, IWord, IWordForm } from "@/common/interfaces";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { editWordAction, setSelectedWord } from "@/lib/words/actions";
import { selectedWordSelector } from "@/lib/words/selectors";
import { isLoadingSelector } from "@/lib/layouts/selectors";

//Components
import { EnglishInput } from "./EnglishInput";
import { PersianInput } from "./PersianInput";
import { DescriptionInput } from "./DescriptionInput";

export const EditWordModal: FC<INextUIModalProps> = ({
  onOpenChange,
  isOpen,
  onClose,
  onOpen,
}) => {
  //Redux
  const dispatch = useAppDispatch();
  const selectedWord = useAppSelector(selectedWordSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  //States
  const [word, setWord] = useState<IWordForm>({
    english: "",
    persian: "",
    description: "",
    important: false,
  });

  //Life cycle
  useEffect(() => {
    console.log("salam2");

    if (selectedWord) {
      setWord(selectedWord);
      (onOpen as () => void)();
    } else {
      (onClose as () => void)();
    }
  }, [selectedWord]);

  //Functions
  async function onCloseHandler() {
    await dispatch(setSelectedWord(undefined));
    setWord({
      english: "",
      persian: "",
      description: "",
      important: false,
    });
  }

  async function submit() {
    try {
      await dispatch(
        editWordAction((selectedWord as IWord)._id as string, word)
      );
      toast.success("The word has been edited", {
        position: "top-center",
      });
      (onClose as () => void)();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onCloseHandler}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Word</ModalHeader>
            <ModalBody>
              <EnglishInput word={word} setWord={setWord} />
              <PersianInput word={word} setWord={setWord} />
              <DescriptionInput word={word} setWord={setWord} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={submit} isLoading={isLoading}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
