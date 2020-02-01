import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "@src/app/rootReducer";
import { render } from "@testing-library/react";

function renderWithRedux(
  ui: React.ReactElement,
  {
    // @ts-ignore
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk))
    )
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

export default renderWithRedux;
