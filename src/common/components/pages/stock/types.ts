import { Stock as StockCommon } from "@src/features/stocks/types";
export type Stock = StockCommon;

export type StockLists = {
  [stocks: string]: Stock[];
};

export type Reorder = (
  list: Stock[],
  startIndex: number,
  endIndex: number
) => Stock[];
