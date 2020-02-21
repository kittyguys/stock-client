import { Stock as StockCommon } from "@src/features/stocks/types";

export type State = {
  notes: Notes;
  note: any;
  activeId: string;
};

export type Action = {
  type: string;
  payload: any;
};

export type FormData = {
  content: string;
};

export type Stock = StockCommon;

export type Notes = Array<{
  id: string;
  title: string;
  created_at: string;
}>;

export type Note = {
  stocks: Stock[];
};
