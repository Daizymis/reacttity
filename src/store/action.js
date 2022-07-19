import * as types from "./actionType"

export function login (data) {
    return (dispatch, getState) => {
      dispatch({ type: types.LOGIN, data: data })
    }
  }