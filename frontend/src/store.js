import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { loadState } from "./localStorage";

const state = loadState();
const middleware = [thunk];

const store = createStore(
  rootReducer,
  state,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
