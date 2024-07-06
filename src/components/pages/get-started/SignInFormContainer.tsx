'use client'

import { useState } from "react";

//Types
import { IAuthForm } from "@/common/interfaces";

//Components
import { MobileInput } from "./MobileInput";
import { CodeInput } from "./CodeInput";
import { SubmitButton } from "./SubmitButton";

export const SignInFormContainer = () => {
  const [form, setForm] = useState<IAuthForm>({
    mobile: "",
    code: "",
  });

  return (
    <div className="text-start">
      <MobileInput form={form} setForm={setForm} />
      <CodeInput form={form} setForm={setForm} />
      <SubmitButton form={form} setForm={setForm} />
    </div>
  );
};
