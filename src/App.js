import "@/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/mobile/Login";
import { createBrowserHistory } from "history";
import NotFound from "@/pages/NotFound";
import React from "react";

const Menu = React.lazy(() => import("@/pages/mobile/Menu"));
const Layout = React.lazy(() => import("@/pages/mobile/Layout"));
const TodoList = React.lazy(() => import("@/pages/mobile/TodoList"));

function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes history={history}>
            <Route index element={<Login />} />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route path="/layout" element={<Layout />}>
              <Route
                path="menu"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Menu />
                  </React.Suspense>
                }
              />
            </Route>
            <Route
              path="/menu"
              element={
                <React.Suspense fallback={<>...</>}>
                  <Menu />
                </React.Suspense>
              }
            />
            <Route
              path="/todolist"
              element={
                <React.Suspense fallback={<>...</>}>
                  <TodoList />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
