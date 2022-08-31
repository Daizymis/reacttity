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
  const {i18n} = useTranslation();
  const navigate =useNavigate();
  useEffect(()=>{
    console.log('llllllllllllllllll')
    if(userInfo?.username) {
      if(pathname === '/login') {
        navigate('/menu');
      }
    }else {
      navigate('/login');
    }
  },[pathname, locale, i18n.language]);
  return <div className="app">
      <LocaleIcon></LocaleIcon>
      <Router></Router>
  </div>
}

const App = () => <BrowserRouter><Index/></BrowserRouter>

export default App;
