import { SET_LISTDATAADAPT } from "../actionType";
import { defaultState } from "../state";
export function listDataAdaptReducer(state = defaultState.userInfo, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_LISTDATAADAPT:
      newState.listDataAdapt = action.data;
      return action.data;
    default:
      return state || {};
  }
}
