//Components
import { MobileInput } from "./MobileInput";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export const FormContainer = () => {
  return (
    <div className="text-start">
      <MobileInput />
      <PasswordInput />
      <SubmitButton />
    </div>
  );
};
