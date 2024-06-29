import { FC } from "react";

//Types
import { IWord } from "@/common/interfaces";
import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { Eye, InfoCircle, Trash } from "iconsax-react";

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
          <Button isIconOnly color="primary" size="sm" variant="flat">
            <Tooltip content="Show/Edit Word">
              <Eye size={"18"} />
            </Tooltip>
          </Button>
          {word.description && (
            <Popover placement="right">
              <PopoverTrigger>
                <Button isIconOnly color="secondary" size="sm" variant="flat">
                  <Tooltip content="Description Word">
                    <InfoCircle size={"18"} />
                  </Tooltip>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="max-w-sm p-3">{word.description}</p>
              </PopoverContent>
            </Popover>
          )}
          <Popover placement="right">
            <PopoverTrigger>
              <Button isIconOnly color="danger" size="sm" variant="flat">
                <Tooltip content="Remove Word">
                  <Trash size={"18"} />
                </Tooltip>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-2">
                <h6 className="mb-2">Are you sure?</h6>
                <div className="flex items-center justify-center gap-2">
                  <Button color="danger" size="sm" variant="flat">
                    Cancel
                  </Button>
                  <Button color="success" size="sm" variant="flat">
                    Yes
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
