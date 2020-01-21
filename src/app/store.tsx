import { createStore, applyMiddleware, compose, Store, AnyAction } from "redux";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import { MakeStore } from "next-redux-wrapper";
import { States } from "./types";
import rootReducer from "@src/app/rootReducer";

export const configureStore: MakeStore = (initialState = {}) => {
  const middleWares = [thunk];
  const store: Store<States, AnyAction> = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleWares), devToolsEnhancer({}))
  );
  return store;
};
