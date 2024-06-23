"use client";

import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { authSubmitAction } from "@/lib/auth/actions";

export const SubmitButton = () => {
  //Redux
  const dispatch = useAppDispatch();

  //Next
  const router = useRouter();

  //Functions
  async function submit() {
    try {
      await dispatch(authSubmitAction());
      toast.success("با موفقیت وارد شدید", { position: "top-center" });
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  }

  return (
    <Button
      color="primary"
      size="lg"
      className="w-full"
      variant="flat"
      onClick={submit}
    >
      ثبت‌ نام | ورود
    </Button>
  );
};
