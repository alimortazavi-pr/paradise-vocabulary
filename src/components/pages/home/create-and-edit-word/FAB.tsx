"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { Add } from "iconsax-react";

//Components
import { CreateWordModal } from "./CreateWordModal";

export const FAB = () => {
  //NextUI
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        aria-label="Create"
        className="fixed bottom-5 end-5"
        size="lg"
        variant="shadow"
        onClick={onOpen}
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
