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
import { INextUIModalProps, IWordForm } from "@/common/interfaces";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createWordAction } from "@/lib/words/actions";
import { isLoadingSelector } from "@/lib/layouts/selectors";

//Components
import { EnglishInput } from "./EnglishInput";
import { PersianInput } from "./PersianInput";
import { DescriptionInput } from "./DescriptionInput";

export const CreateWordModal: FC<INextUIModalProps> = ({
  onOpenChange,
  isOpen,
  onClose,
}) => {
  //Redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  //States
  const [word, setWord] = useState<IWordForm>({
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
      toast.success("The word has been created", {
        position: "top-center",
      });
      (onClose as () => void)();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onCloseHandler} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create Word
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
