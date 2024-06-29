//Types
import { PayloadAction } from "@reduxjs/toolkit";
import { IWord, IWordsState } from "@/common/interfaces";

//Tools

const reducers = {
  setWords(state: IWordsState, action: PayloadAction<IWord[]>): IWordsState {
    return {
      ...state,
      words: action.payload,
    };
  },
  setSelectedWord(
    state: IWordsState,
    action: PayloadAction<IWord | undefined>
  ): IWordsState {
    return {
      ...state,
      selectedWord: action.payload,
    };
  },
};

export default reducers;
