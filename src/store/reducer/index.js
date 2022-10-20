import { combineReducers } from "redux";
import { LOG_OUT, SET_USER_INFO } from "../actionType";
import { defaultState } from "../state";
import { dataAdaptReducer } from "./dataAdaptReducer";
import { listDataAdaptReducer } from "./listDataAdaptReducer";
import localeReducer from "./localeReducer";
import { userReducer } from "./userReducer";


export default combineReducers({
  userInfo: userReducer,
  locale: localeReducer,
  listDataAdapt: listDataAdaptReducer,
  dataAdapt: dataAdaptReducer
});
