//Components
import { CreateWordContainer } from "./create-and-edit-word";
import { WordListContainer } from "./words-list";

export const HomeProvider = () => {
  return (
    <div className="w-screen">
      <WordListContainer />
      <CreateWordContainer />
    </div>
  );
};
