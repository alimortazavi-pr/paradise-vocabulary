import { createSlice } from "@reduxjs/toolkit";

//Types
import { IWordsState } from "@/common/interfaces";

//Reducers
import reducers from "@/lib/words/reducers";

const initialState: IWordsState = {
  words: [],
  selectedWord: undefined,
};

export const wordsReducer = createSlice({
  name: "words",
  initialState,
  reducers,
});

export default wordsReducer.reducer;
