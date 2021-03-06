export type State = {
  isNoteEditing: boolean;
  isDrawerOpen: boolean;
  isDragDisabled: boolean;
  isDeleteModalOpen: boolean;
  isFetching: boolean;
  selectedStockId: string;
  stocks: Stock[];
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
  created_at?: Date | string;
  updated_at?: Date | string;
};
