import produce from "immer";
import { AuthState, AuthAction } from "./types";

const InitialState: AuthState = {
  isSignin: false
};

const auth = produce((state = InitialState, action: AuthAction) => {
  switch (action.type) {
    case "auth/signup/SUCCESS": {
      state.isSignin = true;
      return state;
    }
    case "auth/signup/FAIL": {
      state.isSignin = false;
      return state;
    }
    case "auth/signin/REQUEST": {
      return state;
    }
    case "auth/signin/SUCCESS": {
      state.isSignin = true;
      return state;
    }
    case "auth/signin/FAIL": {
      state.isSignin = false;
      return state;
    }
    case "auth/signout/REQUEST": {
      state.isSignin = false;
      return state;
    }
    default:
      return state;
  }
});

export default auth;
