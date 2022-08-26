import "@/App.scss";
import { BrowserRouter, Routes, Route, useRoutes,useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "react";

import Router from "./route/mobile/index";

const Index = () => {
  return <div>
    <div>
      <Router></Router>
    </div>
  </div>
}

const App = () => <BrowserRouter><Index/></BrowserRouter>

export default App;
