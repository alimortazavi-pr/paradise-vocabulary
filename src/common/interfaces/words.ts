import { Dispatch, SetStateAction } from "react";

export interface IWordsState {
  words: IWord[];
  selectedWord: IWord | undefined;
}

export interface IWord {
  id?: string;
  user?: string;
  english: string;
  persian: string;
  description: string;
  important: boolean;
}

export interface ICreateAndEditComponentsWords {
  word: IWord;
  setWord: Dispatch<SetStateAction<IWord>>;
}
