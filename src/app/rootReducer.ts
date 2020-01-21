import { combineReducers } from "redux";

import auth from "@src/features/auth";
import stocks from "@src/features/stocks";
import notes from "@src/features/notes";
import profile from "@src/features/profile";

export default combineReducers({
  auth,
  stocks,
  notes,
  profile
});
