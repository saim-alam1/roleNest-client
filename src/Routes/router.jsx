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
import PrivateRoutes from "../Contexts/PrivateRoutes/PrivateRoutes";
import Announcements from "../components/Pages/Dashboard/Announcements/Announcements";
import MakePayment from "../components/Pages/Dashboard/MakePayment/MakePayment";
import PaymentHistory from "../components/Pages/Dashboard/PaymentHistory/PaymentHistory";

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
        path: "announcements",
        Component: Announcements,
      },
      {
        path: "make-payment",
        Component: MakePayment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
    ],
  },
]);

export default router;
