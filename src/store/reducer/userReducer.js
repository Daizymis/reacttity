import { PresetColorTypes } from "antd/lib/_util/colors";
import { LOG_OUT, SET_USER_INFO } from "../actionType";
import { defaultState } from "../state";
export function userReducer(state = defaultState.userInfo, action) {
    //   debugger;
    let newState = { ...state };
    console.log(action);
    switch (action.type) {
      case SET_USER_INFO:
        newState.userInfo = action.data;
        return action.value;
      case LOG_OUT:
        newState.userInfo = null;
        return null;
      default:
        return state || {};
    }
  }