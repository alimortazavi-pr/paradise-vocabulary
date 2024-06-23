//Components
import { FormContainer } from "./FormContainer";

export const GetStartedProvider = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full text-center">
        <h4 className="text-4xl mb-5">Welcome</h4>
        <FormContainer />
      </div>
    </div>
  );
};
