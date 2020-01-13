import { combineReducers } from "redux";

import auth from "@src/features/auth";
import stock from "@src/features/stock";
import notes from "@src/features/notes";
import profile from "@src/features/profile";

export default combineReducers({
  auth,
  stock,
  notes,
  profile
});
