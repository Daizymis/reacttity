import {Navigate, useRoutes} from "react-router";
import React, {Suspense} from "react";
import Loading from "../../pages/mobile/Loading";
const Menu = React.lazy(() => import("@/pages/pc/Menu"));

const routerConfig = [
    {
        path: "/",
        element: <Navigate to="/home" />,
    },
    {
        path: "/home",
        element: (
            <Suspense fallback={<Loading />}>
                <Menu />
            </Suspense>
        ),
    },
];

export default routerConfig;
