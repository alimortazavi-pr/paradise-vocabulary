import { FC } from "react";
import { Divider, Tooltip } from "@nextui-org/react";

//Types
import { IWord } from "@/common/interfaces";

//Components
import { DeleteWordButton } from "./DeleteWordButton";
import { WordDescription } from "./WordDescription";
import { ShowAndEditWordButton } from "./ShowAndEditWordButton";

interface IProps {
  word: IWord;
}
export const SingleWord: FC<IProps> = ({ word }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Tooltip content={word.english} placement="bottom-start">
          <h3 className="text-xl font-semibold text-start truncate mb-2">
            {word.english}
          </h3>
        </Tooltip>
        <Tooltip content={word.persian} placement="bottom-end">
          <p className="text-end text-gray-500 truncate yekan-bakh">
            {word.persian}
          </p>
        </Tooltip>
        <Divider className="my-2" />
        <div className="flex items-center gap-2">
          <ShowAndEditWordButton word={word} />
          {word.description && (
            <WordDescription description={word.description} />
          )}
          <DeleteWordButton wordId={word._id as string} />
        </div>
      </div>
    </div>
  );
};
