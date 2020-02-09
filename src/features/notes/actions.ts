import { Stock, Notes } from "./types";

export const NOTE_SWITCH_ACTIVE_ID = "note/switch";
export const GET_NOTES_REQUEST = "notes/get/REQUEST";
export const GET_NOTES_SUCCESS = "notes/get/SUCCESS";
export const GET_NOTES_FAIL = "notes/get/FAIL";
export const GET_NOTE_REQUEST = "note/get/REQUEST";
export const GET_NOTE_SUCCESS = "note/get/SUCCESS";
export const GET_NOTE_FAIL = "note/get/FAIL";
export const RENAME_NOTE_REQUEST = "note/rename/REQUEST";
export const RENAME_NOTE_SUCCESS = "note/rename/SUCCESS";
export const RENAME_NOTE_FAIL = "note/rename/FAIL";
export const CREATE_NOTE_REQUEST = "note/create/REQUEST";
export const CREATE_NOTE_SUCCESS = "note/create/SUCCESS";
export const CREATE_NOTE_FAIL = "note/create/FAIL";
export const ADD_STOCK_TO_NOTE_REQUEST = "note/stock/add/REQUEST";
export const ADD_STOCK_TO_NOTE_SUCCESS = "note/stock/add/SUCCESS";
export const ADD_STOCK_TO_NOTE_FAIL = "note/stock/add/FAIL";
export const CREATE_NOTE_AND_ADD_STOCK_REQUEST =
  "note/create/stock/add/REQUEST";
export const CREATE_NOTE_AND_ADD_STOCK_SUCCESS =
  "note/create/stock/add/SUCCESS";
export const CREATE_NOTE_AND_ADD_STOCK_FAIL = "note/create/stock/add/FAIL";
export const REORDER_STOCKS_OF_NOTE_REQUEST = "note/reorder/REQUEST";
export const REORDER_STOCKS_OF_NOTE_SUCCESS = "note/reorder/SUCCESS";
export const REORDER_STOCKS_OF_NOTE_FAIL = "note/reorder/FAIL";

export const switchActiveId = (id: string) => ({
  type: NOTE_SWITCH_ACTIVE_ID,
  payload: { id }
});

export const getNotesRequest = () => ({
  type: GET_NOTES_REQUEST
});

export const getNotesSuccess = (notes: Notes) => ({
  type: GET_NOTES_SUCCESS,
  payload: { notes }
});

export const getNotesFail = () => ({
  type: GET_NOTES_FAIL
});

export const getNoteRequest = () => ({
  type: GET_NOTE_REQUEST
});

export const getNoteSuccess = ({
  id,
  stocks
}: {
  id: string;
  stocks: Stock[];
}) => ({
  type: GET_NOTE_SUCCESS,
  payload: { id, stocks }
});

export const getNoteFail = () => ({
  type: GET_NOTE_FAIL
});

export const renameNoteRequest = () => ({
  type: RENAME_NOTE_REQUEST
});

export const renameNoteSuccess = () => ({
  type: RENAME_NOTE_SUCCESS
});

export const renameNoteFail = () => ({
  type: RENAME_NOTE_FAIL
});

export const createNoteRequest = () => ({
  type: CREATE_NOTE_REQUEST
});

export const createNoteSuccess = (note: any) => {
  return {
    type: CREATE_NOTE_SUCCESS,
    payload: { note }
  };
};

export const createNoteFail = () => ({
  type: CREATE_NOTE_FAIL
});

export const addStockToNoteRequest = () => ({
  type: ADD_STOCK_TO_NOTE_REQUEST
});

export const addStockToNoteSuccess = (stock: Stock) => ({
  type: ADD_STOCK_TO_NOTE_SUCCESS,
  payload: { stock }
});

export const addStockToNoteFail = () => ({
  type: ADD_STOCK_TO_NOTE_FAIL
});

export const createNoteAndAddStockRequest = (title: string, stock: Stock) => ({
  type: CREATE_NOTE_AND_ADD_STOCK_REQUEST,
  payload: { title, stock }
});

export const createNoteAndAddStockSuccess = () => ({
  type: CREATE_NOTE_AND_ADD_STOCK_SUCCESS
});

export const createNoteAndAddStockFail = () => ({
  type: CREATE_NOTE_AND_ADD_STOCK_FAIL
});

export const reorderNoteRequest = (stocks: Stock[]) => ({
  type: REORDER_STOCKS_OF_NOTE_REQUEST,
  payload: { stocks }
});

export const reorderNoteSuccess = (stocks: Stock[]) => ({
  type: REORDER_STOCKS_OF_NOTE_SUCCESS,
  payload: { stocks }
});

export const reorderNoteFail = () => ({
  type: REORDER_STOCKS_OF_NOTE_FAIL
});
