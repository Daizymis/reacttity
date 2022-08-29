import { Suspense } from "react";
import { Navigate, useRoutes } from "react-router";
import React from "react";
import NotFound from "@/pages/NotFound";
import Loading from "../../pages/mobile/Loading";

const Menu = React.lazy(() => import("@/pages/mobile/Menu"));
const Login = React.lazy(() => import("@/pages/mobile/Login"));
const Layout = React.lazy(() => import("@/pages/mobile/Layout"));
const TodoList = React.lazy(() => import("../../pages/mobile/TodoList"));
const My = React.lazy(()=> import('@/pages/mobile/My'))
const routerConfig = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "menu",
        element: (
          <Suspense fallback={<Loading />}>
            <Menu />
          </Suspense>
        ),
        meta: {
          footerActive: "my",
        },
      },
      {
        path: "my",
        element: (
          <Suspense fallback={<Loading />}>
            <My state={{my: true}}/>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "todoList/:type",
    element: (
      <Suspense fallback={<Loading />}>
        <TodoList />
      </Suspense>
    ),
    meta: {},
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const Router = () => {
  const routes = useRoutes(routerConfig);
  return routes;
};

export default Router;
