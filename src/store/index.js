import { createStore, applyMiddleware } from "redux";
import reducers from "./reducer/index.js";
import thunk from "redux-thunk";
// import logger from 'redux-logger'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const persistConfig = {
  key: "reactivity",
  storage,
  whitelist: ["userInfo", "locale", "listDataAdapt", "dataAdapt"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const myLogger = ({dispatch, getState}) => {
  return dispatch => action =>{
    console.log(action.type +'执行了')
    return dispatch(action);
  }
}
const myThunk = ({dispatch, getState}) => {
  return dispatch => action =>{
    if(typeof action === 'function'){
      return action(dispatch, getState)
    }
    return dispatch(action);
  }
}
//生成store对象
const store = createStore(persistedReducer, applyMiddleware(myLogger, myThunk)); //内部会第一次调用reducer函数，得到初始state
const persistor = persistStore(store);
export { store, persistor };
