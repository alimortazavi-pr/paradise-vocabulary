"use client";

import { Button } from "@nextui-org/react";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsVisibleTranslator } from "@/lib/layouts/actions";
import { isVisibleTranslatorSelector } from "@/lib/layouts/selectors";

export const IframeTranslator = () => {
  //Redux
  const dispatch = useAppDispatch();
  const isVisibleTranslator = useAppSelector(isVisibleTranslatorSelector);

  //Functions
  function toggleTranslator() {
    dispatch(setIsVisibleTranslator(!isVisibleTranslator));
  }

  return (
    <div className="w-full p-2 pb-0">
      <Button variant="flat" color="primary" onClick={toggleTranslator} className="w-full">
        {isVisibleTranslator ? "Hide Translate" : "Show Translate"}
      </Button>
      {isVisibleTranslator ? (
        <iframe
          src="https://libretranslate.com/?source=en&target=fa"
          className="w-full h-[500px] rounded-xl mt-2"
          title="Translator"
        ></iframe>
      ) : (
        ""
      )}
    </div>
  );
};
