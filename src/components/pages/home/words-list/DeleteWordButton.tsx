import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { Trash } from "iconsax-react";
import { FC, useState } from "react";
import { toast } from "react-toastify";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteWordAction } from "@/lib/words/actions";
import { isLoadingSelector } from "@/lib/layouts/selectors";

interface IProps {
  wordId: string;
}
export const DeleteWordButton: FC<IProps> = ({ wordId }) => {
  //Redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  //States
  const [isOpen, setIsOpen] = useState(false);

  //Functions
  async function deleteWordFunc() {
    try {
      await dispatch(deleteWordAction(wordId));
      toast.success("The word has been deleted", {
        position: "top-center",
      });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <Popover
      placement="right"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
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
            <Button
              color="success"
              size="sm"
              variant="flat"
              onClick={deleteWordFunc}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
