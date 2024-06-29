import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { InfoCircle } from "iconsax-react";
import { FC } from "react";

interface IProps {
  description: string;
}
export const WordDescription: FC<IProps> = ({ description }) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button isIconOnly color="secondary" size="sm" variant="flat">
          <Tooltip content="Description Word">
            <InfoCircle size={"18"} />
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="max-w-sm p-3">{description}</p>
      </PopoverContent>
    </Popover>
  );
};
