import "@/App.scss";
import { BrowserRouter, Routes, Route, useNavigate,useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import React, { useEffect, useReducer } from "react";

import Router from "./route/mobile/index";
import { useDispatch, useStore } from "react-redux";
import { useTranslation } from "react-i18next";
import { changeConfirmLocale } from "antd/lib/modal/locale";
import LocaleIcon from "./components/LocaleIcon";

const Index = () => {
  const {pathname} = useLocation();
  const {userInfo, locale} = useStore().getState();
 
  const navigate =useNavigate();
  useEffect(()=>{
    if(userInfo?.username) {
      if(pathname === '/login') {
        navigate('/menu');
      }
    }else {
      navigate('/login');
    }
  },[pathname, locale]);
  return <div>
    <div>
      <LocaleIcon></LocaleIcon>
      <Router></Router>
    </div>
  </div>
}

const App = () => <BrowserRouter><Index/></BrowserRouter>

export default App;
