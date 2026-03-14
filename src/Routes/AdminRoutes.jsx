import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../components/Pages/Shared/Loadings/Loading";
import { Navigate, useLocation } from "react-router";

const AdminRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loading />;
  if (!user || role !== "admin") {
    return <Navigate state={location.pathname} to={"/forbidden-access"} />;
  }

  return children;
};

export default AdminRoutes;
