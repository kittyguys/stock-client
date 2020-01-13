export type Stock = { id: string; content: string; created_at: Date | string };

export type StockLists = {
  [stocks: string]: Stock[];
};

export type Reorder = (
  list: Stock[],
  startIndex: number,
  endIndex: number
) => Stock[];
