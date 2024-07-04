import { UseDisclosureProps } from "@nextui-org/react";

//Types

export interface ILayoutsState {
  darkMode: boolean;
  isLoading: boolean;
  isVisibleTranslator: boolean;
}

export interface INextUIModalProps extends UseDisclosureProps {
  onOpenChange: () => void;
}
