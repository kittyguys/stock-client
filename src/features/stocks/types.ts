export type State = {
  isNoteEditing: boolean;
  isDrawerOpen: boolean;
  stocks: [];
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
