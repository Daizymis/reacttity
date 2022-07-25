import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers.js";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "reactivity",
  storage,
  whitelist: ["userInfo"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
//生成store对象
const store = createStore(persistedReducer, applyMiddleware(thunk)); //内部会第一次调用reducer函数，得到初始state
const persistor = persistStore(store);
export { store, persistor };
