//Types
import { IWord } from "@/common/interfaces";
import { RootState } from "@/lib";

export function wordsSelector(state: RootState): IWord[] {
  return state.words.words;
}

export function selectedWordSelector(state: RootState): IWord | undefined {
  return state.words.selectedWord;
}
