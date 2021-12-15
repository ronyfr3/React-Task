import {
  DATA_LIST_SUCCESS,
  DATA_LIST_REQUEST,
  DATA_LIST_FAIL,
  FILTERED_LIST_SUCCESS,
  FILTERED_LIST_FAIL,
} from "../constants/actionType";

//REDUCER_FUNCTION
export const data = (state = { loading: true, data: [] }, action) => {
  switch (action.type) {
    case DATA_LIST_REQUEST:
      return { loading: true };
    case DATA_LIST_SUCCESS:
      return { loading: false, data: action.payload };
    case DATA_LIST_FAIL:
      return { loading: false, error: "something wrong" };
    default:
      return state;
  }
};

//REDUCER_FUNCTION
export const confirmData = (state = { datas: [] }, action) => {
  switch (action.type) {
    case FILTERED_LIST_SUCCESS:
      return { 
        datas:[...state.datas,action.payload]
       };
    case FILTERED_LIST_FAIL:
      return { error: "something wrong" };
    default:
      return state;
  }
};
