import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthContext";
import Loading from "../../components/Pages/Shared/Loadings/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return children;
  }
  return (
    <Navigate state={location.pathname} to={"/auth-Layout/login"}></Navigate>
  );
};

export default PrivateRoutes;
