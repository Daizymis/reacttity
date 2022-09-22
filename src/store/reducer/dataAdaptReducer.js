import { SET_DATAADAPT } from "../actionType";
import { defaultState } from "../state";
export function listDataAdaptReducer(state = defaultState.userInfo, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_DATAADAPT:
      newState.dataAdapt = action.data;
      return action.data;
    default:
      return state || {};
  }
}
