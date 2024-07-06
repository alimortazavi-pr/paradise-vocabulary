"use client";

import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import convertAPToEnglish from "ap-to-english";
import { toast } from "react-toastify";
import oneToTwoNumber from "one-to-two-num";

//Types
import { IAuthForm } from "@/common/interfaces";

//Redux
import { useAppDispatch } from "@/lib/hooks";
import { requestNewCode } from "@/lib/auth/actions";

interface IProps {
  form: IAuthForm;
  setForm: Dispatch<SetStateAction<IAuthForm>>;
}
export const CodeInput: FC<IProps> = ({ form, setForm }) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [error, setError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = useState<{ value: number; status: boolean }>({
    value: 120,
    status: false,
  });

  //Functions
  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (
      !e.target.value ||
      e.target.value.length < 6 ||
      e.target.value.length > 6
    ) {
      setError({ status: true, message: "Code format is incorrect" });
      setForm({
        ...form,
        code: convertAPToEnglish(e.target.value.replace(/\,/g, "")),
      });
    } else if (
      !convertAPToEnglish(e.target.value.replace(/\,/g, "")).match(/^-?\d+$/)
    ) {
      return;
    } else if (e.target.value.length > 11) {
      return;
    } else {
      setError({ status: false, message: "" });
      setForm({
        ...form,
        code: convertAPToEnglish(e.target.value.replace(/\,/g, "")),
      });
    }
  }

  function calculatingCounter(time: number) {
    let count: number;
    count = time;
    (window as any).counterInterval = setInterval(() => {
      if (count !== 0) {
        count -= 1;
        setCounter({ status: true, value: count });
      } else {
        setCounter({ value: count, status: false });
        window.clearInterval((window as any).counterInterval);
      }
    }, 1000);
  }

  async function requestCode() {
    window.clearInterval((window as any).counterInterval);
    setIsLoading(true);
    try {
      await dispatch(requestNewCode(form.mobile));
      toast.success("Code has been sent", {
        position: "top-center",
      });
      calculatingCounter(120);
      setIsLoading(false);
    } catch (err: any) {
      calculatingCounter(counter.value);
      toast.error(err.message, {
        position: "top-center",
      });
      setIsLoading(false);
    }
  }

  return (
    <Input
      className="mb-3"
      type="text"
      label="Code"
      onChange={onChangeHandler}
      value={form.code}
      isInvalid={error.status}
      errorMessage={error.message}
      endContent={
        counter.status ? (
          <div
            className={`p-1 text-center text-gray-800 dark:text-gray-200 dark:border-gray-500`}
          >
            <span>
              {oneToTwoNumber(Math.floor(counter.value / 60)) +
                ":" +
                oneToTwoNumber(Math.floor(counter.value % 60))}
            </span>
          </div>
        ) : (
          <Button
            isLoading={isLoading}
            color={"secondary"}
            onClick={() => requestCode()}
            className="w-full md:w-auto"
            isDisabled={form.mobile?.length < 11 || form.mobile?.length > 11}
          >
            New Code
          </Button>
        )
      }
    />
  );
};
