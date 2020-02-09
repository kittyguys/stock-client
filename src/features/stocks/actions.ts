import { Stock } from "./types";

export const OPEN_DELETE_MODAL = "stocks/openDeleteModal";
export const TOGGLE_NOTE = "stocks/toggleNoteComponent";
export const TOGGLE_DRAGGABLE = "stocks/toggleDraggable";
export const SELECT_STOCK = "stocks/select";
export const GET_STOCKS_REQUEST = "stocks/get/REQUEST";
export const GET_STOCKS_SUCCESS = "stocks/get/SUCCESS";
export const GET_STOCKS_FAIL = "stocks/get/FAIL";
export const CREATE_STOCK_REQUEST = "stocks/create/REQUEST";
export const CREATE_STOCK_SUCCESS = "stocks/create/SUCCESS";
export const CREATE_STOCK_FAIL = "stocks/create/FAIL";
export const ADD_STOCK_REQUEST = "stocks/add/REQUEST";
export const ADD_STOCK_SUCCESS = "stocks/add/SUCCESS";
export const ADD_STOCK_FAIL = "stocks/add/FAIL";
export const DELETE_STOCK_REQUEST = "stocks/delete/REQUEST";
export const DELETE_STOCK_SUCCESS = "stocks/delete/SUCCESS";
export const DELETE_STOCK_FAIL = "stocks/delete/FAIL";
export const TOGGLE_DRAWER = "stocks/toggleDrawer";
export const REORDER = "stocks/reorder";
export const REORDER_STOCKS_REQUEST = "stocks/reorder/REQUEST";
export const REORDER_STOCKS_SUCCESS = "stocks/reorder/SUCCESS";
export const REORDER_STOCKS_FAIL = "stocks/reorder/FAIL";

export const openDeleteModal = () => ({
  type: OPEN_DELETE_MODAL
});

export const toggleNote = () => ({
  type: TOGGLE_NOTE
});

export const toggleDraggable = () => ({
  type: TOGGLE_DRAGGABLE
});

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER
});

export const selectStock = (stockId: string) => ({
  type: SELECT_STOCK,
  payload: { stockId }
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

export const deleteStockRequest = () => ({
  type: DELETE_STOCK_REQUEST
});

export const deleteStockSuccess = (stockId: number) => ({
  type: DELETE_STOCK_SUCCESS,
  payload: { stockId }
});

export const deleteStockFail = () => ({
  type: DELETE_STOCK_FAIL
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
