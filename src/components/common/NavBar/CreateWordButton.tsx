"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { Add } from "iconsax-react";

//Components
import { CreateWordModal } from "@/components/pages/home/create-and-edit-word/CreateWordModal";

export const CreateWordButton = () => {
  //NextUI
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        aria-label="Create"
        onClick={onOpen}
        className="hidden md:flex"
      >
        <Add size={"30"} />
      </Button>
      <CreateWordModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};
