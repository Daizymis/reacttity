import "@/App.scss";
import { BrowserRouter, useNavigate,useLocation } from "react-router-dom";
import React, { useEffect, } from "react";

import Router from "./route/mobile/index";
import {  useStore } from "react-redux";
import { useTranslation } from "react-i18next";
import LocaleIcon from "./components/LocaleIcon";

const Index = () => {
  const {pathname} = useLocation();
  const {userInfo, locale} = useStore().getState();
  const {i18n} = useTranslation();
  const navigate =useNavigate();
  console.log(pathname.indexOf('todolist'));
  useEffect(()=>{
    if(userInfo?.username) {
      if(pathname === '/login') {
        navigate('/menu');
      }
    }else {
      navigate('/login');
    }
  },[pathname, locale, i18n.language]);
  return <div className="app">
      {!~pathname.indexOf('todolist') && <LocaleIcon></LocaleIcon>}
      <Router></Router>
  </div>
}

const App = () => <BrowserRouter><Index/></BrowserRouter>

export default App;
