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
  id: string;
  content: string;
  created_at: Date | string;
};

export type Notes = Array<{
  id: string;
  title: string;
  created_at: string;
}>;

export type Note = {
  stocks: Stock[];
};
