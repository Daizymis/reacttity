import { SET_DATAADAPT } from "../actionType";
import { defaultState } from "../state";
export function dataAdaptReducer(state = defaultState.dataAdapt, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_DATAADAPT:
      if (Object.keys(action.data).length === 0) {
        newState.dataAdapt = action.data;
      } else {
        newState = {
          ...newState,
          [action.data.timestamp]: action.data,
        };
      }
      return newState;
    default:
      return state || {};
  }
}
