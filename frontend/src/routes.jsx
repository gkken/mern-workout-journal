import { createBrowserRouter, redirect } from "react-router-dom";
import PrivateRouteGuard from "./components/PrivateRouteGuard";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

const routes = [
  {
    path: "/",
    element: <PrivateRouteGuard />,
    children: [
      {
        path: "/",
        loader: () =>
          redirect("/home", {
            status: 302,
          }),
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

export default createBrowserRouter(routes);
