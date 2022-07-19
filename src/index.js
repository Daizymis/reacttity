import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux'
import utils from '@/utils'
// 引入创建好的store实例
import store from '@/store/index.js'
if (process.env.NODE_ENV === 'development') {
  require('./mock/index')
}
import '@/utils'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
