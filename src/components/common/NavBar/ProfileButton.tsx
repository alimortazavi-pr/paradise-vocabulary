"use client";

import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { User } from "iconsax-react";
import { useRouter } from "next/navigation";

//Redux
import { userSelector } from "@/lib/profile/selectors";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logOut } from "@/lib/auth/actions";

export const ProfileButton = () => {
  //Redux
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  //Next
  const router = useRouter();

  //Functions
  async function logOutFunc() {
    await dispatch(logOut());
    router.push("/get-started");
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button isIconOnly color="secondary">
            <User size={"18"} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Listbox aria-label="Profile">
            <ListboxItem key="user">{user?.mobile}</ListboxItem>
            <ListboxItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={logOutFunc}
            >
              Logout
            </ListboxItem>
          </Listbox>
        </PopoverContent>
      </Popover>
    </>
  );
};
