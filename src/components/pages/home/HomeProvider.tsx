import { FC } from "react";

//Types
import { IWord } from "@/common/interfaces";

//Components
import { NavBarContainer } from "@/components/common/NavBar";
import { CreateWordContainer } from "./create-and-edit-word";
import { WordListContainer } from "./words-list";
import { FooterContainer } from "@/components/common/Footer";
import { IframeTranslator } from "./translator";

interface IProps {
  words: IWord[];
}
export const HomeProvider: FC<IProps> = ({ words }) => {
  return (
    <div className="w-screen mt-16 mb-7">
      <NavBarContainer />
      <IframeTranslator />
      <WordListContainer words={words} />
      <CreateWordContainer />
      <FooterContainer />
    </div>
  );
};
