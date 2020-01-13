import produce from "immer";
import { SettingsState, SettingsAction } from "./types";

const InitialState: SettingsState = {
  isLoading: false
};

const settings = produce((state = InitialState, action: SettingsAction) => {
  switch (action.type) {
    case "settings/profile/update/REQUEST": {
      state.isSignin = true;
      return state;
    }
    case "settings/profile/update/SUCCESS": {
      state.isSignin = false;
      return state;
    }
    case "settings/profile/update/FAIL": {
      return state;
    }
    default:
      return state;
  }
});

export default settings;
