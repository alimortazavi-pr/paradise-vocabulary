import { Button, Tooltip } from "@nextui-org/react";
import { Eye } from "iconsax-react";
import { FC } from "react";

//Interfaces
import { IWord } from "@/common/interfaces";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { setSelectedWord } from "@/lib/words/actions";

interface IProps {
  word: IWord;
}
export const ShowAndEditWordButton: FC<IProps> = ({ word }) => {
  //Redux
  const dispatch = useAppDispatch();

  //Functions
  function selectWord() {
    dispatch(setSelectedWord(word));
  }

  return (
    <Button
      isIconOnly
      color="primary"
      size="sm"
      variant="flat"
      onClick={selectWord}
    >
      <Tooltip content="Show/Edit Word">
        <Eye size={"18"} />
      </Tooltip>
    </Button>
  );
};
