'use client'

import { useState } from "react";

//Types
import { IAuthForm } from "@/common/interfaces";

//Components
import { MobileInput } from "./MobileInput";
import { CodeInput } from "./CodeInput";
import { SubmitButton } from "./SubmitButton";
import { FirstNameInput } from "./FirstNameInput";
import { LastNameInput } from "./LastNameInput";

export const SignUpFormContainer = () => {
  const [form, setForm] = useState<IAuthForm>({
    firstName: "",
    lastName: "",
    mobile: "",
    code: "",
  });

  return (
    <div className="text-start">
      <FirstNameInput form={form} setForm={setForm} />
      <LastNameInput form={form} setForm={setForm} />
      <MobileInput form={form} setForm={setForm} />
      <CodeInput form={form} setForm={setForm} />
      <SubmitButton form={form} setForm={setForm} />
    </div>
  );
};
