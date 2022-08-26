import { lazy } from "react";
import { Suspense } from "react";
import React from "react";
const Menu = React.lazy(() => import("@/pages/mobile/Menu"));
import Login from "@/pages/mobile/Login";
import { Navigate, useRoutes } from "react-router";
const Layout = React.lazy(() => import("@/pages/mobile/Layout"));
import NotFound from "@/pages/NotFound";
import Loading from "../../pages/mobile/Loading";
import TodoList from "../../pages/mobile/TodoList";
const routerConfig = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Suspense fallback={<Loading/>}><Login /></Suspense>,
  },
  {
    path: "/",
    element: <Suspense fallback={<Loading/>}><Layout /></Suspense>,
    children: [
      {
        path: "menu",
        element: <Suspense fallback={<Loading/>}><Menu /></Suspense>,
        meta: {
          footerActive: "my",
        },
      },
    ],
  },
  {
    path: "todoList/:type",
    element: <Suspense fallback={<Loading/>}><TodoList /></Suspense>,
    meta: {
      
    },
  },
  {
    path: "*",
    element: <NotFound/>,
  },
];

const Router = () => {
    const routes = useRoutes(routerConfig);
    return routes;
}

export default Router;
