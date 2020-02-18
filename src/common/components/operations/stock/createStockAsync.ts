import client from "@src/utils/client";
import {
  createStockRequest,
  createStockSuccess,
  createStockFail
} from "@src/features/stocks/actions";
import { Dispatch } from "react";

export const createStockAsync = (
  dispatch: Dispatch<any>,
  data: {
    content: string;
  }
) => {
  dispatch(createStockRequest());
  client()
    .post("/api/stocks/", {
      ...data
    })
    .then(({ data }) => {
      dispatch(createStockSuccess(data.stock));
    })
    .catch(err => {
      console.log(err.message);
      dispatch(createStockFail());
    });
};
