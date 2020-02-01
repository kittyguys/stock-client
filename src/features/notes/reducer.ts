import produce from "immer";
import { State, Action } from "./types";

const initialState: State = {
  notes: [],
  note: {
    id: "",
    title: "",
    stocks: []
  },
  activeId: "1"
};

const notes = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case "note/switch": {
      state.activeId = action.payload.id;
      return state;
    }
    case "notes/get/REQUEST": {
      return state;
    }
    case "notes/get/SUCCESS": {
      state.notes = action.payload.notes;
      return state;
    }
    case "notes/get/FAIL": {
      return state;
    }
    case "note/reorder": {
      state.note.stocks = action.payload.stocks;
      return state;
    }
    case "note/get/REQUEST": {
      return state;
    }
    case "note/get/SUCCESS": {
      state.note = {
        ...state.note,
        ...action.payload
      };
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
      state.note = {
        ...state.note,
        ...action.payload.note
      };
      return state;
    }
    case "note/create/FAIL": {
      return state;
    }
    case "note/stock/add/REQUEST": {
      return state;
    }
    case "note/stock/add/SUCCESS": {
      state.note.stocks.push(...action.payload.stock);
      return state;
    }
    case "note/stock/add/FAIL": {
      return state;
    }
    case "note/create/stock/add/REQUEST": {
      state.note.title = action.payload.title;
      state.note.stocks.push(action.payload.stock);
      return state;
    }
    case "note/create/stock/add/SUCCESS": {
      return state;
    }
    case "note/create/stock/add/FAIL": {
      return state;
    }
    case "note/reorder/REQUEST": {
      state.note.stocks = action.payload.stocks;
      return state;
    }
    case "note/reorder/SUCCESS": {
      state.note.stocks = action.payload.stocks;
      return state;
    }
    case "note/reorder/FAIL": {
      return state;
    }
    default:
      return state;
  }
});

export default notes;
