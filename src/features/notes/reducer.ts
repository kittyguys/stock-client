import produce from "immer";
import { State, Action } from "./types";

const initialState: State = {
  notes: [],
  note: {}
};

const notes = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "note/reorder": {
      state.note.stocks = action.payload.stocks;
      return state;
    }
    case "note/get/REQUEST": {
      return state;
    }
    case "note/get/SUCCESS": {
      state.note = action.payload;
      return state;
    }
    case "note/get/FAIL": {
      return state;
    }
    case "note/rename/REQUEST": {
      return state;
    }
    case "note/rename/SUCCESS": {
      state.note.title = action.payload.title;
      return state;
    }
    case "note/rename/FAIL": {
      return state;
    }
    case "note/create/REQUEST": {
      return state;
    }
    case "note/create/SUCCESS": {
      state.notes.push(action.payload.note);
      return state;
    }
    case "note/create/FAIL": {
      return state;
    }
    case "note/stock/add/REQUEST": {
      return state;
    }
    case "note/stock/add/SUCCESS": {
      state.note.stocks.push(action.payload.stock);
      return state;
    }
    case "note/stock/add/FAIL": {
      return state;
    }
    default:
      return state;
  }
});

export default notes;
