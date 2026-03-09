import Navbar from "../../Pages/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Pages/Footer/Footer";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-480 mx-auto min-h-[calc(100vh-117px)] grow w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
