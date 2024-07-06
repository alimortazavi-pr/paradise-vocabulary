import { AppThunk } from "@/lib";

//Actions of other libs
import { setIsLoading } from "../layouts/actions";

//Reducer
import { wordsReducer } from ".";

//Actions from reducer
export const { setWords, setSelectedWord } = wordsReducer.actions;

//Interfaces
import { IWordForm } from "@/common/interfaces";

//Services
import api from "@/services/axiosInstance";

//Actions from actions
export function getAllUserWords(): AppThunk {
  return async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    try {
      const res = await api.get("/words", {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      dispatch(setWords(res.data.words));
      dispatch(setIsLoading(false));
    } catch (error: any) {      
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data?.message || error.message);
    }
  };
}

export function createWordAction(wordForm: IWordForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const res = await api.post(
        "/words",
        {
          english: wordForm.english,
          persian: wordForm.persian,
          description: wordForm.description,
          important: wordForm.important,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
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

export function editWordAction(wordId: string, wordForm: IWordForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const res = await api.put(
        `/words/${wordId}`,
        {
          english: wordForm.english,
          persian: wordForm.persian,
          description: wordForm.description,
          important: wordForm.important,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      );
      dispatch(
        setWords([
          ...getState().words.words.map((word) =>
            word._id === wordId ? res.data.word : word
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
      await api.delete(`/words/${wordId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });
      dispatch(
        setWords([
          ...getState().words.words.filter((word) => word._id !== wordId),
        ])
      );
      dispatch(setIsLoading(false));
    } catch (error: any) {
      dispatch(setIsLoading(false));
      throw new Error(error?.response?.data || error.message);
    }
  };
}
