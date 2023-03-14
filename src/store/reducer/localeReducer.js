import { PresetColorTypes } from "antd/lib/_util/colors";
import { defaultState } from "../state";

export default function localeReducer(
  prevState = defaultState.locale,
  action = {}
) {
  switch (action.type) {
    case "change":
      localStorage.setItem('locale', action.value);
      return action.value;
    default:
      return "zhCN";
  }
}
