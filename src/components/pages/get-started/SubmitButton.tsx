"use client";

import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";

//Types
import { IAuthForm } from "@/common/interfaces";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { isLoadingSelector } from "@/lib/layouts/selectors";
import { isSigningUpSelector } from "@/lib/auth/selectors";
import { signIn, signUp } from "@/lib/auth/actions";

interface IProps {
  form: IAuthForm;
  setForm: Dispatch<SetStateAction<IAuthForm>>;
}
export const SubmitButton: FC<IProps> = ({ form, setForm }) => {
  //Redux
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(isLoadingSelector);
  const isSigningUp = useAppSelector(isSigningUpSelector);

  //Next
  const router = useRouter();

  //Functions
  async function submit() {
    try {
      if (isSigningUp) {
        if (
          !form.firstName ||
          !form.lastName ||
          form.mobile.length < 11 ||
          form.mobile.length > 11 ||
          form.code.length < 6 ||
          form.code.length > 6
        ) {
          toast.error("Please fill all of fields", { position: "top-center" });
          return;
        }
        await dispatch(signUp(form));
        toast.success("SignUp is Successfully", {
          position: "top-center",
        });
        router.push("/");
      } else {
        if (
          form.mobile.length < 11 ||
          form.mobile.length > 11 ||
          form.code.length < 6 ||
          form.code.length > 6
        ) {
          toast.error("Please fill all of fields", { position: "top-center" });
          return;
        }
        await dispatch(signIn(form));
        toast.success("SignIn is Successfully", {
          position: "top-center",
        });
        router.push("/");
      }
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
