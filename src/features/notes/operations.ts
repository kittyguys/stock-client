import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createInstance } from "@src/utils/request";
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
> => dispatch => {
  dispatch(getNotesRequest());
  const request = createInstance();
  request({
    method: "get",
    url: "/api/notes"
  })
    .then(res => {
      dispatch(getNotesSuccess(res.data.notes));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(getNotesFail());
    });
};

export const getNoteAsync = (
  id: string
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(getNoteRequest());
  const request = createInstance();
  request({
    method: "get",
    url: `/api/notes/${id}`
  })
    .then(({ data }) => {
      const stocks = data.stocks.map((item: any) => {
        item.id = "" + item.id;
        return item;
      });
      dispatch(getNoteSuccess({ id, stocks }));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(getNoteFail());
    });
};

export const renameNoteAsync = ({
  note_id,
  title
}: {
  note_id: string;
  title: string;
}): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(renameNoteRequest());
  const request = createInstance();
  request({
    method: "post",
    url: `/api/notes/${note_id}`,
    data: {
      title
    }
  })
    .then(() => {
      dispatch(renameNoteSuccess());
    })
    .catch(err => {
      console.log(err.message);
      dispatch(renameNoteFail());
    });
};

export const createNoteAsync = (
  title: string
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(createNoteRequest());
  const request = createInstance();
  request({
    method: "post",
    url: "/api/notes/",
    data: {
      title
    }
  })
    .then(({ data }) => {
      dispatch(createNoteSuccess(data.note));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(createNoteFail());
    });
};

export const addStockToNoteAsync = ({
  note_id,
  stock_id
}: {
  note_id: string;
  stock_id: string;
}): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(addStockToNoteRequest());
  const request = createInstance();
  request({
    method: "post",
    url: `/api/notes/${note_id}/stocks`,
    data: {
      stock_id
    }
  }).catch(err => {
    console.log(err.message);
    dispatch(addStockToNoteFail());
  });
};

export const createNoteAndAddStockAsync = ({
  title,
  stock
}: {
  title: string;
  stock: Stock;
}): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(createNoteAndAddStockRequest(title, stock));
  const request = createInstance();
  request({
    method: "post",
    url: "/api/notes/",
    data: {
      title
    }
  })
    .then(res => {
      const note = res.data.note;
      const stock_id = stock.id;
      dispatch(createNoteSuccess(note));
      request({
        method: "post",
        url: `/api/notes/${note.id}/stocks`,
        data: {
          stock_id
        }
      })
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

export const reorderNoteAsync = ({
  note_id,
  stocks
}: {
  note_id: string;
  stocks: Stock[];
}): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  const stockIds = stocks.map((item: Stock) => {
    return item.id;
  });
  dispatch(reorderNoteRequest(stocks));
  const request = createInstance();
  request({
    method: "patch",
    url: `/api/notes/${note_id}/reorder`,
    data: { stocks: stockIds }
  })
    .then(({ data }) => {
      dispatch(reorderNoteSuccess(data.stocks));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(reorderNoteFail());
    });
};
