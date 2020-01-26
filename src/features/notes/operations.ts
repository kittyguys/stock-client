import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
import {
  getNotesRequest,
  getNotesSuccess,
  getNotesFail,
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
import { Stock } from "./types";

export const getNotesAsync = (): ThunkAction<
  void,
  {},
  undefined,
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(getNotesRequest());
    axios
      .get(`http://localhost:8080/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(getNotesSuccess(res.data.notes));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(getNotesFail());
      });
  };
};

export const getNoteAsync = (
  id: string
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(getNoteRequest());
    axios
      .get(`http://localhost:8080/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(getNoteSuccess({ id, stocks: res.data.stocks }));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(getNoteFail());
      });
  };
};

export const renameNoteAsync = ({
  note_id,
  title
}: {
  note_id: string;
  title: string;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(renameNoteRequest());
    axios
      .patch(
        `http://localhost:8080/api/notes/${note_id}`,
        { title },
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
        "http://localhost:8080/api/notes",
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
        dispatch(createNoteSuccess(res.data.note));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(createNoteFail());
      });
  };
};

export const createNoteAndAddStockAsync = ({
  title,
  stock_id
}: {
  title: string;
  stock_id: string;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(createNoteRequest());
    axios
      .post(
        "http://localhost:8080/api/notes",
        {
          title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        const note_id = res.data.note.id;
        dispatch(createNoteSuccess(note_id));
        dispatch(addStockToNoteRequest());
        axios
          .post(
            `http://localhost:8080/api/notes/${note_id}/stocks`,
            {
              stock_id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(res => {
            dispatch(addStockToNoteSuccess(res.data.stock));
          })
          .catch(err => {
            console.log(err.message);
            dispatch(addStockToNoteFail());
          });
      })
      .catch(err => {
        console.log(err.message);
        dispatch(createNoteFail());
      });
  };
};

export const addStockToNoteAsync = ({
  note_id,
  stock_id
}: {
  note_id: string;
  stock_id: string;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(addStockToNoteRequest());
    axios
      .post(
        `http://localhost:8080/api/notes/${note_id}/stocks`,
        {
          stock_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .catch(err => {
        console.log(err.message);
        dispatch(addStockToNoteFail());
      });
  };
};

export const reorderNoteAsync = ({
  note_id,
  stocks
}: {
  note_id: string;
  stocks: Stock[];
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    const stockIds = stocks.map((item: Stock) => {
      return item.id;
    });
    dispatch(reorderNoteRequest(stocks));
    axios
      .patch(
        `http://localhost:8080/api/notes/${note_id}/reorder`,
        { stocks: stockIds },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(reorderNoteSuccess(res.data.stocks));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(reorderNoteFail());
      });
  };
};
