import { createBrowserRouter } from "react-router";
import HomeLayout from "../components/Layouts/MainLayout/MainLayout";
import Home from "../components/Pages/Home/Home";
import Apartment from "../components/Pages/Apartment/Apartment";
import Login from "../components/Pages/Login.jsx/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/apartment",
        Component: Apartment,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default router;
