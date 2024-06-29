import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { toast } from "react-toastify";

//Types
import { INextUIModalProps, IWord } from "@/common/interfaces";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { createWordAction } from "@/lib/words/actions";

//Components
import { EnglishInput } from "./EnglishInput";
import { PersianInput } from "./PersianInput";
import { DescriptionInput } from "./DescriptionInput";

export const EditWordModal: FC<INextUIModalProps> = ({
  onOpenChange,
  isOpen,
  onClose,
}) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [word, setWord] = useState<IWord>({
    english: "",
    persian: "",
    description: "",
    important: false,
  });

  //Functions
  function onCloseHandler() {
    setWord({
      english: "",
      persian: "",
      description: "",
      important: false,
    });
  }

  async function submit() {
    try {
      await dispatch(createWordAction(word));
      toast.success("The word has been edited", {
        position: "top-center",
      });
      (onClose as () => void)();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onCloseHandler}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Word
            </ModalHeader>
            <ModalBody>
              <EnglishInput word={word} setWord={setWord} />
              <PersianInput word={word} setWord={setWord} />
              <DescriptionInput word={word} setWord={setWord} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={submit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
