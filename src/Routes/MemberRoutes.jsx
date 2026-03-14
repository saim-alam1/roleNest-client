import { use } from "react";
import useUserRole from "../Hooks/useUserRole";
import { AuthContext } from "../Contexts/AuthContext";
import Loading from "../components/Pages/Shared/Loadings/Loading";
import { Navigate } from "react-router";

const MemberRoutes = () => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading />;

  if (!user || role !== "member") {
    return <Navigate to="/dashboard/forbidden-access" />;
  }
};

export default MemberRoutes;
