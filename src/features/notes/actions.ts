import { Stock, Note } from "./types";

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
export const REORDER = "note/reorder";
export const REORDER_STOCKS_OF_NOTE_REQUEST = "note/reorder/REQUEST";
export const REORDER_STOCKS_OF_NOTE_SUCCESS = "note/reorder/SUCCESS";
export const REORDER_STOCKS_OF_NOTE_FAIL = "note/reorder/FAIL";

export const getNoteRequest = () => ({
  type: GET_NOTE_REQUEST
});

export const getNoteSuccess = (res: any) => ({
  type: GET_NOTE_SUCCESS,
  payload: { res }
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

export const createNoteSuccess = (res: any) => ({
  type: CREATE_NOTE_SUCCESS,
  payload: { res }
});

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

export const reorderNote = (stocks: Stock[]) => ({
  type: REORDER,
  payload: { stocks }
});

export const reorderNoteRequest = () => ({
  type: REORDER_STOCKS_OF_NOTE_REQUEST
});

export const reorderNoteSuccess = () => ({
  type: REORDER_STOCKS_OF_NOTE_SUCCESS
});

export const reorderNoteFail = () => ({
  type: REORDER_STOCKS_OF_NOTE_FAIL
});
