"use client";

import { useEffect } from "react";

//Redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllUserWords } from "@/lib/words/actions";
import { wordsSelector } from "@/lib/words/selectors";

//Components
import { SingleWord } from "./SingleWord";

export const WordListContainer = () => {
  //Redux
  const dispatch = useAppDispatch();
  const words = useAppSelector(wordsSelector);

  //Life cycle
  useEffect(() => {
    dispatch(getAllUserWords());
  }, []);

  return (
    <div className="p-2 grid grid-cols-12 gap-2">
      {words?.map((word) => (
        <SingleWord word={word} key={word.id} />
      ))}
    </div>
  );
};
