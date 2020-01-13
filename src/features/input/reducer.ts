type State = {
  addTag: string;
};

const initialState: State = {
  addTag: ""
};

const mypageInputReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "MYPAGEINPUT_CHANGE":
      return {
        addTag: action.payload
      };
    default:
      return state;
  }
};

export default mypageInputReducer;
