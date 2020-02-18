import { combineReducers } from "redux";

import auth from "@src/features/auth";
import stocks from "@src/features/stocks";
import notes from "@src/features/notes";
import profile from "@src/features/profile";

import { States } from "./types";

const appReducer = combineReducers({
  auth,
  stocks,
  notes,
  profile
});

export default (state: States | undefined, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};
