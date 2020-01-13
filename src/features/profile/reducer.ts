import produce from "immer";

type State = {
  userName: string;
  displayName: string;
  email: string;
  profile_image_url: string;
};

const initialState: State = {
  userName: "",
  displayName: "",
  email: "",
  profile_image_url: ""
};

const profile = produce((state = initialState, action: any) => {
  switch (action.type) {
    case "profile/update/REQUEST":
      return state;
    case "profile/update/SUCCESS":
      state = { ...action.payload.profile };
      return state;
    case "profile/update/FAIL":
      return state;
    default:
      return state;
  }
});

export default profile;
