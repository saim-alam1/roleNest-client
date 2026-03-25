import { use, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../../../assets/management.png";
import {
  MdDescription,
  MdHistory,
  MdLocalOffer,
  MdOutlinePayment,
  MdOutlinePeopleAlt,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import useIsActive from "../../../Hooks/useIsActive";
import useUserRole from "../../../Hooks/useUserRole";
import Loading from "../../Pages/Shared/Loadings/Loading";
import { toast } from "react-toastify";

const DashBoardLayout = () => {
  const { user, logOutUser } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <Loading />;

  console.log(role);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white border-r border-gray-200 min-h-screen">
        <aside
          className={`
          fixed lg:static shrink-0 z-50 top-0 left-0 w-64 px-4 py-8 h-screen bg-white border-r border-gray-200 overflow-y-auto
          transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
        >
          {/* Close Button for Mobile */}
          <div className="flex justify-end lg:hidden mb-4">
            <button onClick={() => setIsOpen(false)} className="text-[18px]">
              ✕
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <img src={logo} alt="Logo" className="h-6" />
            <h4 className="text-xl font-bold">
              Role<span className="color-primary">Nest</span>
            </h4>
          </Link>

          {/* User Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-24 h-24 rounded-full ring-2 ring-blue-500 p-1 object-cover"
            />
            <h4 className="mt-2 font-semibold text-heading">
              {user?.displayName}
            </h4>
            <p className="text-sm description-text">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard" end className={useIsActive}>
              <MdOutlineSpaceDashboard style={{ marginRight: "8px" }} />{" "}
              Dashboard
            </NavLink>

            {/* Admin Route */}
            {role === "admin" && (
              <>
                <NavLink to="admin-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> Admin Profile
                </NavLink>
                <NavLink to="manage-members" className={useIsActive}>
                  <MdOutlinePeopleAlt style={{ marginRight: "8px" }} /> Manage
                  Members
                </NavLink>
                <NavLink to="make-announcement" className={useIsActive}>
                  <TfiAnnouncement style={{ marginRight: "8px" }} /> Make
                  Announcement
                </NavLink>
                <NavLink to="agreement-requests" className={useIsActive}>
                  <MdDescription style={{ marginRight: "8px" }} /> Agreement
                  Requests
                </NavLink>
                <NavLink to="manage-coupons" className={useIsActive}>
                  <MdLocalOffer style={{ marginRight: "8px" }} /> Manage Coupons
                </NavLink>
              </>
            )}

            {/* Member & User Shared Route */}
            {(role === "member" || role === "user") && (
              <>
                <NavLink to="/dashboard/my-profile" className={useIsActive}>
                  <FaRegUser style={{ marginRight: "8px" }} /> My Profile
                </NavLink>
                <NavLink to="/dashboard/announcements" className={useIsActive}>
                  <TfiAnnouncement style={{ marginRight: "8px" }} />{" "}
                  Announcements
                </NavLink>
              </>
            )}

            {/* Member Routes */}
            {role === "member" && (
              <>
                <NavLink to="/dashboard/make-payment" className={useIsActive}>
                  <MdOutlinePayment style={{ marginRight: "8px" }} /> Make
                  Payment
                </NavLink>
                <NavLink
                  to="/dashboard/payment-history"
                  className={useIsActive}
                >
                  <MdHistory style={{ marginRight: "8px" }} /> Payment History
                </NavLink>
              </>
            )}
          </nav>

          <div className="flex items-end justify-center h-full">
            <span className="border-t border-[#6b7280] w-full">
              <button
                onClick={handleLogOut}
                className="btn border-none w-full my-1.5"
              >
                Logout
              </button>
            </span>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen flex flex-col">
        {/* Mobile toggle button */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center">
          <button onClick={() => setIsOpen(true)} className="text-[18px]">
            ☰
          </button>
        </div>

        <div className="grow lg:px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
