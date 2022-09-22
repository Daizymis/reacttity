import { combineReducers } from "redux";
import { LOG_OUT, SET_USER_INFO } from "../actionType";
import { defaultState } from "../state";
import { listDataAdaptReducer } from "./listDataAdaptReducer";
import localeReducer from "./localeReducer";
import { userReducer } from "./userReducer";

export function cityReducer(state = defaultState.city, action) {
  switch (action.type) {
    case "SET_CITY":
      return action.data;
    default:
      return state || {};
  }
}


export default combineReducers({
  cityReducer,
  userInfo: userReducer,
  locale: localeReducer,
  listDataAdapt: listDataAdaptReducer
});
