import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Contexts/AutContext";
import Loading from "../Loadings/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoutes;
