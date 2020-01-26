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
  createNoteAndAddStockRequest,
  createNoteAndAddStockSuccess,
  createNoteAndAddStockFail,
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
      .get(`http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes`, {
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
      .get(
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
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
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}`,
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
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes`,
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
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}/stocks`,
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

export const createNoteAndAddStockAsync = ({
  title,
  stock
}: {
  title: string;
  stock: Stock;
}): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(createNoteAndAddStockRequest(title, stock));
    axios
      .post(
        "http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes",
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
        const note = res.data.note;
        const stock_id = stock.id;
        dispatch(createNoteSuccess(note));
        axios
          .post(
            `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note.id}/stocks`,
            {
              stock_id
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            dispatch(createNoteAndAddStockSuccess());
          })
          .catch(err => {
            console.log(err.message);
            dispatch(addStockToNoteFail());
          });
      })
      .catch(err => {
        console.log(err.message);
        dispatch(createNoteFail());
        dispatch(createNoteAndAddStockFail());
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
        `http://${process.env.API_PATH}:${process.env.API_PORT}/api/notes/${note_id}/reorder`,
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
