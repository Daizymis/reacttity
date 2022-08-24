import { lazy } from "react";
import React from "react";
const Menu = React.lazy(() => import("@/pages/mobile/Menu"));
const Layout = React.lazy(() => import("@/pages/mobile/Layout"));
const TodoList = React.lazy(() => import("@/pages/mobile/TodoList"));
export const routes = [
    {
        path: '/',
        redirect: '/index',
    },{
        path: '/home',
        element: lazy(()=>import('../../pages/mobile/Layout')),
        children: [
            {
                path: 'menu',
                element: <Menu/>,
                meta: {
                    footerActive: 'my'
                }
            }
        ]
    }
]