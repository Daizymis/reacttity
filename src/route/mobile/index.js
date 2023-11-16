import {Suspense} from "react";
import {Navigate, useRoutes} from "react-router";
import React from "react";
import NotFound from "@/pages/NotFound";
import Loading from "../../pages/mobile/Loading";
import UniversalProjectApproval from "../../pages/UniversalProjectApproval";

const Menu = React.lazy(() => import("@/pages/mobile/Menu"));
const Login = React.lazy(() => import("@/pages/mobile/Login"));
const Layout = React.lazy(() => import("@/pages/mobile/Layout"));
const TodoList = React.lazy(() => import("../../pages/mobile/TodoList"));
const My = React.lazy(() => import("@/pages/mobile/My"));
const Sign = React.lazy(() => import("@/pages/mobile/Sign"));
const OrderDetail = React.lazy(() => import("@/pages/mobile/Order/index"));
const OuterStatementDetail = React.lazy(() => import("@/pages/mobile/OuterStatement/index"));
const InvoiceDetail = React.lazy(() => import('@/pages/mobile/InvoiceDetail/index'))

const mobileRoutes = [
    {
        path: "/",
        element: <Navigate to="/login"/>,
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading/>}>
                <Login/>
            </Suspense>
        ),
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading/>}>
                <Layout/>
            </Suspense>
        ),
        children: [
            {
                path: "menu",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Menu/>
                    </Suspense>
                ),
                meta: {
                    footerActive: "my",
                },
            },
            {
                path: "my",
                element: (
                    <Suspense fallback={<Loading/>}>
                        <My state={{my: true}}/>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "todoList/:type",
        element: (
            <Suspense fallback={<Loading/>}>
                <TodoList/>
            </Suspense>
        ),
        meta: {},
    },
    {
        path: 'OrderDetails',
        element: (
            <Suspense fallback={<Loading/>}>
                <OrderDetail></OrderDetail>
            </Suspense>
        )
    },
    {
        path: 'OuterStatementDetails',
        element: (
            <Suspense fallback={<Loading/>}>
                <OuterStatementDetail></OuterStatementDetail>
            </Suspense>
        )
    },
    {
        path: 'sign',
        element: (
            <Suspense fallback={<Loading/>}>
                <Sign/>
            </Suspense>
        )
    },
    {
        path: 'UniversalProjectApprovalDetail',
        element: (
            <Suspense fallback={<Loading/>}>
                <UniversalProjectApproval/>
            </Suspense>
        )
    },
    {
        path: 'InvoiceDetail',
        element: (
            <Suspense fallback={<Loading/>}>
                <InvoiceDetail/>
            </Suspense>
        )
    },
    {
        path: "*",
        element: <NotFound/>,
    },
];

export default mobileRoutes;
