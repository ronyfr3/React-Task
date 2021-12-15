import { combineReducers } from "redux";
import { data } from "./data";
import { confirmData } from "./data";

export const reducers = combineReducers({
  data,
  confirmData,
});
