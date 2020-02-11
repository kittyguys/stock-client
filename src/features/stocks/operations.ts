import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { createInstance } from "@src/utils/request";
import {
  getStocksRequest,
  getStocksSuccess,
  getStocksFail,
  createStockRequest,
  createStockSuccess,
  createStockFail,
  addStockRequest,
  addStockSuccess,
  addStockFail,
  updateStockRequest,
  updateStockSuccess,
  updateStockFail,
  deleteStockRequest,
  deleteStockSuccess,
  deleteStockFail,
  reorderStocksRequest,
  reorderStocksSuccess,
  reorderStocksFail
} from "./actions";
import { FormData } from "./types";

export const getStocksAsync = (): ThunkAction<
  void,
  {},
  undefined,
  AnyAction
> => dispatch => {
  dispatch(getStocksRequest());
  const request = createInstance();
  request({
    method: "get",
    url: "/api/stocks/"
  })
    .then(({ data }) => {
      const reversed = data.stocks.reverse();
      dispatch(getStocksSuccess(reversed));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(getStocksFail());
    });
};

export const createStockAsync = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(createStockRequest());
  const request = createInstance();
  request({
    method: "post",
    url: "/api/stocks/",
    data: {
      ...data
    }
  })
    .then(({ data }) => {
      dispatch(createStockSuccess(data.stock));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(createStockFail());
    });
};

export const addStockAsync = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(addStockRequest());
  const request = createInstance();
  request({
    method: "patch",
    url: "/api/stocks/",
    data: {
      ...data
    }
  })
    .then(({ data }) => {
      dispatch(addStockSuccess(data.stock));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(addStockFail());
    });
};

export const updateStockAsync: (
  data: FormData
) => ThunkAction<void, {}, undefined, AnyAction> = data => dispatch => {
  dispatch(updateStockRequest());
  const request = createInstance();
  request({
    method: "patch",
    url: "/api/stocks/",
    data: {
      ...data
    }
  })
    .then(({ data }) => {
      dispatch(updateStockSuccess(data.stock));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(updateStockFail());
    });
};

export const deleteStockAsync = (
  stockId: any
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  dispatch(deleteStockRequest());
  const request = createInstance();
  request({
    method: "delete",
    url: "/api/stocks/",
    data: {
      stockId
    }
  })
    .then(({ data }) => {
      dispatch(deleteStockSuccess(data.stockId));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(deleteStockFail());
    });
};

export const reorderStocksAsync = (
  data: any
): ThunkAction<void, {}, undefined, AnyAction> => dispatch => {
  const stocks = data.map((item: any) => {
    return item.id;
  });
  dispatch(reorderStocksRequest());
  const request = createInstance();
  request({
    method: "patch",
    url: "/api/stocks/reorder",
    data: {
      stocks
    }
  })
    .then(_res => {
      dispatch(reorderStocksSuccess());
    })
    .catch(err => {
      console.log(err.message);
      dispatch(reorderStocksFail());
    });
};
