import { Stock } from "./types";

export const TOGGLE_NOTE = "stocks/toggleNoteComponent";
export const GET_STOCKS_REQUEST = "stocks/get/REQUEST";
export const GET_STOCKS_SUCCESS = "stocks/get/SUCCESS";
export const GET_STOCKS_FAIL = "stocks/get/FAIL";
export const CREATE_STOCK_REQUEST = "stocks/create/REQUEST";
export const CREATE_STOCK_SUCCESS = "stocks/create/SUCCESS";
export const CREATE_STOCK_FAIL = "stocks/create/FAIL";
export const ADD_STOCK_REQUEST = "stocks/add/REQUEST";
export const ADD_STOCK_SUCCESS = "stocks/add/SUCCESS";
export const ADD_STOCK_FAIL = "stocks/add/FAIL";
export const TOGGLE_DRAWER = "stocks/toggleDrawer";
export const REORDER = "stocks/reorder";
export const REORDER_STOCKS_REQUEST = "stocks/reorder/REQUEST";
export const REORDER_STOCKS_SUCCESS = "stocks/reorder/SUCCESS";
export const REORDER_STOCKS_FAIL = "stocks/reorder/FAIL";

export const toggleNote = () => ({
  type: TOGGLE_NOTE
});

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
});

export const getStocksRequest = () => ({
  type: GET_STOCKS_REQUEST
});

export const getStocksSuccess = (stocks: []) => ({
  type: GET_STOCKS_SUCCESS,
  payload: { stocks }
});

export const getStocksFail = () => ({
  type: GET_STOCKS_FAIL
});

export const createStockRequest = () => ({
  type: CREATE_STOCK_REQUEST
});

export const createStockSuccess = (stock: Stock) => ({
  type: CREATE_STOCK_SUCCESS,
  payload: { stock }
});

export const createStockFail = () => ({
  type: CREATE_STOCK_FAIL
});

export const addStockRequest = () => ({
  type: ADD_STOCK_REQUEST
});

export const addStockSuccess = (stock: Stock) => ({
  type: ADD_STOCK_SUCCESS,
  payload: { stock }
});

export const addStockFail = () => ({
  type: ADD_STOCK_FAIL
});

export const reorderStocks = (stocks: any) => ({
  type: REORDER,
  payload: { stocks }
});

export const reorderStocksRequest = () => ({
  type: REORDER_STOCKS_REQUEST
});

export const reorderStocksSuccess = () => ({
  type: REORDER_STOCKS_SUCCESS
});

export const reorderStocksFail = () => ({
  type: REORDER_STOCKS_FAIL
});
