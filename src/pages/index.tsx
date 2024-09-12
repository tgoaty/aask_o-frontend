import {lazy, Suspense} from "react";

import Admin from "./admin/Admin.tsx";
import NotFound from "./notFound/NotFound.tsx";
import Loader from "../shared/ui/Loader.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const Main= lazy(() => import("./main/Main.tsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>
    },
    {
        path: "/admin",
        element: <Admin/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

const Routing = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    );
};

export default Routing;