import { AppThunk } from "@/lib";
import axios from "axios";

//Actions of other reducers

//Reducer
import { wordsReducer } from ".";

//Actions from reducer
export const { setWords, setSelectedWord } = wordsReducer.actions;

//Interfaces
import { IWord } from "@/common/interfaces";

//Utils
import { storage } from "@/common/utils";

//Actions from actions
export function getAllUserWords(): AppThunk {
  return async (dispatch) => {
    try {
      const token = storage.getToken();
      const res = await axios.get("/api", {
        headers: {
          token,
        },
      });
      dispatch(setWords(res.data.words));
    } catch (error: any) {
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function createWordAction(wordForm: IWord): AppThunk {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const res = await axios.post(
        "/api",
        {
          english: wordForm.english,
          persian: wordForm.persian,
          description: wordForm.description,
          important: wordForm.important,
        },
        {
          headers: {
            token,
          },
        }
      );
      dispatch(setWords([...getState().words.words, res.data.word]));
    } catch (error: any) {
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function editWordAction(wordId: string, wordForm: IWord): AppThunk {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const res = await axios.put(
        `/api/${wordId}`,
        {
          english: wordForm.english,
          persian: wordForm.persian,
          description: wordForm.description,
          important: wordForm.important,
        },
        {
          headers: {
            token,
          },
        }
      );
      dispatch(
        setWords([
          ...getState().words.words.map((word) =>
            word.id === wordId ? res.data.word : word
          ),
        ])
      );
    } catch (error: any) {
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function deleteWordAction(wordId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`/api/${wordId}`, {
        headers: {
          token,
        },
      });
      dispatch(
        setWords([
          ...getState().words.words.filter((word) => word.id !== wordId),
        ])
      );
    } catch (error: any) {
      throw new Error(error?.response?.data || error.message);
    }
  };
}
