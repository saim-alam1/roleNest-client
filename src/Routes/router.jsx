import { createBrowserRouter } from "react-router";
import HomeLayout from "../components/Layouts/MainLayout/MainLayout";
import Home from "../components/Pages/Home/Home";
import Apartment from "../components/Pages/Apartment/Apartment";
import Login from "../components/Pages/Login/Login";
import AuthLayout from "../components/Layouts/AuthLayout/AuthLayout";
import Register from "../components/Pages/Register/Register";
import DashBoardLayout from "../components/Layouts/DashBoardLayout/DashBoardLayout";
import DashboardHome from "../components/Pages/Dashboard/DashboardHome/DashboardHome";
import MyProfile from "../components/Pages/Dashboard/MyProfile/MyProfile";
import Announcement from "../components/Pages/Dashboard/Announcement/Announcement";
import PrivateRoutes from "../Contexts/PrivateRoutes/PrivateRoutes";

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
    ],
  },
  {
    path: "/auth-Layout",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "announcement",
        Component: Announcement,
      },
    ],
  },
]);

export default router;
