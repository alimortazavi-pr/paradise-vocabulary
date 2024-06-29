import { AppThunk } from "@/lib";
import axios from "axios";

//Actions of other libs
import { setIsLoading } from "../layouts/actions";

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
    dispatch(setIsLoading(true));
    try {
      const token = storage.getToken();
      const res = await axios.get("/api/words", {
        headers: {
          token,
        },
      });
      dispatch(setWords(res.data.words));
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function createWordAction(wordForm: IWord): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));

      const token = getState().auth.token;
      const res = await axios.post(
        "/api/words",
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
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function editWordAction(wordId: string, wordForm: IWord): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const token = getState().auth.token;
      const res = await axios.put(
        `/api/words/${wordId}`,
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
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}

export function deleteWordAction(wordId: string): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const token = getState().auth.token;
      await axios.delete(`/api/words/${wordId}`, {
        headers: {
          token,
        },
      });
      dispatch(
        setWords([
          ...getState().words.words.filter((word) => word.id !== wordId),
        ])
      );
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}
