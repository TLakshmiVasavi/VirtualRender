import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { AppState } from "./rootReducer";
import rootReducer from "./rootReducer";

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
}

export const store: any = configureStore();
