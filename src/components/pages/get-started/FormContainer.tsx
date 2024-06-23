//Components
import { MobileInput } from "./MobileInput";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export const FormContainer = () => {
  return (
    <div className="px-5 text-start">
      <MobileInput />
      <PasswordInput />
      <SubmitButton />
    </div>
  );
};
