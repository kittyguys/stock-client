import produce from "immer";
import { State, Action } from "./types";

const initialState: State = {
  isNoteEditing: false,
  isDrawerOpen: false,
  isDragDisabled: true,
  isDeleteModalOpen: false,
  selectedStockId: "",
  stocks: []
};

const stocks = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "stocks/openDeleteModal": {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
      return state;
    }
    case "stocks/toggleNoteComponent": {
      state.isNoteEditing = !state.isNoteEditing;
      return state;
    }
    case "stocks/toggleDraggable": {
      state.isDragDisabled = !state.isDragDisabled;
      return state;
    }
    case "stocks/toggleDrawer": {
      state.isDrawerOpen = !state.isDrawerOpen;
      return state;
    }
    case "stocks/select": {
      state.selectedStockId = action.payload.stockId;
      return state;
    }
    case "stocks/reorder": {
      state.stocks = action.payload.stocks;
      return state;
    }
    case "stocks/get/REQUEST": {
      return state;
    }
    case "stocks/get/SUCCESS": {
      state.stocks = action.payload.stocks;
      return state;
    }
    case "stocks/get/FAIL": {
      return state;
    }
    case "stocks/create/REQUEST": {
      return state;
    }
    case "stocks/create/SUCCESS": {
      state.stocks.push(action.payload.stock);
      return state;
    }
    case "stocks/create/FAIL": {
      return state;
    }
    case "stocks/add/REQUEST": {
      return state;
    }
    case "stocks/add/SUCCESS": {
      state.stocks.push(action.payload.stock);
      return state;
    }
    case "stocks/add/FAIL": {
      return state;
    }
    case "stocks/delete/REQUEST": {
      return state;
    }
    case "stocks/delete/SUCCESS": {
      state.stocks = state.stocks.filter((item: any) => {
        return item.id !== action.payload.stockId;
      });
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
      return state;
    }
    case "stocks/delete/FAIL": {
      return state;
    }
    default:
      return state;
  }
});

export default stocks;
