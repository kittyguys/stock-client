import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import Cookies from "js-cookie";
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
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(getStocksRequest());
    axios
      .get("http://localhost:8080/api/stocks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const reversed = res.data.stocks.reverse();
        dispatch(getStocksSuccess(reversed));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(getStocksFail());
      });
  };
};

export const createStockAsync = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(createStockRequest());
    axios
      .post("http://localhost:8080/api/stocks", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(createStockSuccess(res.data.stock));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(createStockFail());
      });
  };
};

export const addStockAsync = (
  data: FormData
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    dispatch(addStockRequest());
    axios
      .patch("http://localhost:8080/api/stocks", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        dispatch(addStockSuccess(res.data.stock));
      })
      .catch(err => {
        console.log(err.message);
        dispatch(addStockFail());
      });
  };
};

export const reorderStocksAsync = (
  data: any
): ThunkAction<void, {}, undefined, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const token = Cookies.get("jwt"); // TODO: 有効期限をチェック
    const stocks = data.map((item: any) => {
      return item.id;
    });
    dispatch(reorderStocksRequest());
    axios
      .patch(
        "http://localhost:8080/api/stocks/reorder",
        { stocks },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        dispatch(reorderStocksSuccess());
      })
      .catch(err => {
        console.log(err.message);
        dispatch(reorderStocksFail());
      });
  };
};
