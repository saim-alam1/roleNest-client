import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-480 mx-auto min-h-[calc(100vh-117px)] grow w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
