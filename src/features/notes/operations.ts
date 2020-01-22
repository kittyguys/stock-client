import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import {
  getNoteRequest,
  getNoteSuccess,
  getNoteFail,
  renameNoteRequest,
  renameNoteSuccess,
  renameNoteFail,
  createNoteRequest,
  createNoteSuccess,
  createNoteFail,
  addStockToNoteRequest,
  addStockToNoteSuccess,
  addStockToNoteFail,
  reorderNoteRequest,
  reorderNoteSuccess,
  reorderNoteFail
} from "./actions";
import { FormData } from "./types";

export const getNoteAsync = (
  note_id: string
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(getNoteRequest());
    axios
      .get(
        `${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(getNoteSuccess(res.data));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(getNoteFail());
      });
  };
};

export const renameNoteAsync = ({
  note_id,
  newTitle
}: {
  note_id: string;
  newTitle: string;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(renameNoteRequest());
    axios
      .patch(
        `${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(renameNoteSuccess());
      })
      .catch(err => {
        console.log(err.message);
        dispatch(renameNoteFail());
      });
  };
};

export const createNoteAsync = (
  title: string
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(createNoteRequest());
    axios
      .post(
        `${process.env.API_PATH}:${process.env.API_PORT}/api/notes`,
        {
          title: title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(createNoteSuccess(res.data));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(createNoteFail());
      });
  };
};

export const addStockToNoteAsync = ({
  note_id,
  stock
}: {
  note_id: string;
  stock: any;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(addStockToNoteRequest());
    axios
      .patch(
        `${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}/stocks`,
        {
          stock: stock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        const reversed = res.data.stocks.revers();
        dispatch(addStockToNoteSuccess(reversed));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(addStockToNoteFail());
      });
  };
};

export const reorderNoteAsync = (
  data: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    const stocks = data.map((item: any) => {
      return item.id;
    });
    dispatch(reorderNoteRequest());
    axios
      .patch(
        `${process.env.API_PATH}:${process.env.API_PORT}/api/notes/reorder`,
        { stocks },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(reorderNoteSuccess());
      })
      .catch(err => {
        console.log(err.message);
        dispatch(reorderNoteFail());
      });
  };
};
