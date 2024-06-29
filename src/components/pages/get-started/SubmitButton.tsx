"use client";

import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authSubmitAction } from "@/lib/auth/actions";
import { isLoadingSelector } from "@/lib/layouts/selectors";

export const SubmitButton = () => {
  //Redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);

  //Next
  const router = useRouter();

  //Functions
  async function submit() {
    try {
      await dispatch(authSubmitAction());
      toast.success("SignIn|SignUp is Successfully", {
        position: "top-center",
      });
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
      isLoading={isLoading}
    >
      Submit
    </Button>
  );
};
