import { combineReducers } from "redux";
import { data } from "./data";
import { filteredData } from "./data";

export const reducers = combineReducers({
  data,
  filteredData,
});
