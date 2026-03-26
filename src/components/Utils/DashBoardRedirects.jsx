import { use } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import useUserRole from "../../Hooks/useUserRole";
import { Navigate } from "react-router";
import Loading from "../Pages/Shared/Loadings/Loading";

const DashBoardRedirects = () => {
  const { user } = use(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  if (user && role === "admin") {
    return <Navigate to="admin-profile" />;
  }
  if (user && (role === "user" || role === "member")) {
    return <Navigate to="my-profile" replace />;
  }
};

export default DashBoardRedirects;
