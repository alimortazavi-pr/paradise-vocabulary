import { Dispatch, SetStateAction } from "react";

export interface IWordsState {
  words: IWord[];
  selectedWord: IWord | undefined;
}

export interface IWord {
  _id: string;
  user: string;
  english: string;
  persian: string;
  description: string;
  important: boolean;
  deleted: boolean;
}

export interface IWordForm {
  english: string;
  persian: string;
  description: string;
  important: boolean;
}

export interface ICreateAndEditComponentsWords {
  word: IWordForm;
  setWord: Dispatch<SetStateAction<IWordForm>>;
}
