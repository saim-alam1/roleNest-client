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
import Announcements from "../components/Pages/Dashboard/Announcements/Announcements";
import MakePayment from "../components/Pages/Dashboard/MakePayment/MakePayment";
import PaymentHistory from "../components/Pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorComponent from "../components/Pages/Shared/Error/ErrorComponent";
import PrivateRoutes from "../Routes/PrivateRoutes";
import ForbiddenAccess from "../components/Pages/Shared/Error/ForbiddenAccess";
import AdminProfile from "../components/Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageMembers from "../components/Pages/Dashboard/Admin/ManageMembers/ManageMembers";
import MakeAnnouncement from "../components/Pages/Dashboard/Admin/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../components/Pages/Dashboard/Admin/AgreementRequests/AgreementRequests";
import ManageCoupons from "../components/Pages/Dashboard/Admin/ManageCoupons/ManageCoupons";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorComponent />,
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
      // Admin Route
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "agreement-requests",
        element: <AgreementRequests />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },
      // User & Member Shared Components
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "announcements",
        Component: Announcements,
      },
      // Member Route
      {
        path: "make-payment",
        Component: MakePayment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // Warning Component
      {
        path: "forbidden-access",
        Component: ForbiddenAccess,
      },
    ],
  },
]);

export default router;
