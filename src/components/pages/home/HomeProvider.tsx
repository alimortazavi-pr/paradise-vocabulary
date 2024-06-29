//Components
import { NavBarContainer } from "@/components/common/NavBar";
import { CreateWordContainer } from "./create-and-edit-word";
import { WordListContainer } from "./words-list";
import { FooterContainer } from "@/components/common/Footer";

export const HomeProvider = () => {
  return (
    <div className="w-screen mt-16 mb-7">
      <NavBarContainer />
      <WordListContainer />
      <CreateWordContainer />
      <FooterContainer />
    </div>
  );
};
