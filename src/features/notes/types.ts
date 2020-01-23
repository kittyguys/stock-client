export type State = {
  notes: [];
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

export type Stock = {
  id: number;
  content: string;
};

export type Note = {
  stocks: Stock[];
};
