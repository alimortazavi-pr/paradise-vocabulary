import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FC, useState } from "react";

//Types
import { INextUIModalProps, IWord } from "@/common/interfaces";

//Components
import { EnglishInput } from "./EnglishInput";
import { PersianInput } from "./PersianInput";
import { DescriptionInput } from "./DescriptionInput";

export const CreateWordModal: FC<INextUIModalProps> = ({
  onOpenChange,
  isOpen,
}) => {
  //States
  const [word, setWord] = useState<IWord>({
    english: "",
    persian: "",
    description: "",
    important: false,
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
