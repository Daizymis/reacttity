import { changeLanguage } from "i18next";
import * as types from "./actionType";
import zhCN from "antd-mobile/es/locales/zh-CN";
import enUS from "antd-mobile/es/locales/en-US";

export function login(data) {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN, data: data });
  };
}
export function logout(data) {
  return (dispatch, getState) => {
    dispatch({ type: types.LOG_OUT});
  };
}
export function changeLanguage(locale) {
  dispatch({ type: "change", value: locale });
}
