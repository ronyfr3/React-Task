import {
  DATA_LIST_SUCCESS,
  FILTERED_LIST_SUCCESS,
  FILTERED_LIST_FAIL,
  DATA_LIST_FAIL,
} from "../constants/actionType";

import * as api from "../api";

//GET_ALL_DATA_FROM_LOCAL_API
export const getData = () => async (dispatch) => {
  try {
    const { data } = await api.fetchData();
    dispatch({
      type: DATA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_LIST_FAIL,
      payload: "Something Wrong 500!",
    });
  }
};
//GET_FILTERED_DATA
export const filterData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: FILTERED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FILTERED_LIST_FAIL,
      payload: "No data available!",
    });
  }
};
