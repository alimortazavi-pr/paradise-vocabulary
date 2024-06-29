//Components
import { FormContainer } from "./FormContainer";

export const GetStartedProvider = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen p-2">
      <div className="w-full text-center max-w-md bg-white min-h-96 flex flex-col justify-between rounded-3xl p-5 pt-20">
        <h4 className="text-4xl">Welcome</h4>
        <FormContainer />
      </div>
    </div>
  );
};
