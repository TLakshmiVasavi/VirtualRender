import { combineReducers } from "redux";
import { empReducer } from "./Reducer";
import { store } from "./Store";

const rootReducer = combineReducers({
  employee: empReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof store.getState>;
