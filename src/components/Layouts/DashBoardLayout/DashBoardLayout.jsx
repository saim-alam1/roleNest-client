import { use, useState } from "react";
import { AuthContext } from "../../../Contexts/AutContext";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../../../assets/management.png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import useIsActive from "../../../Hooks/useIsActive";

const DashBoardLayout = () => {
  const { user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-50 top-0 left-0 h-screen w-64 px-4 py-8 overflow-y-auto bg-white border-r border-gray-200
          transform transition-transform duration-300
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
            <MdOutlineSpaceDashboard style={{ marginRight: "8px" }} /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/my-profile" className={useIsActive}>
            <FaRegUser style={{ marginRight: "8px" }} /> My Profile
          </NavLink>
          <NavLink to="/dashboard/announcement" className={useIsActive}>
            <TfiAnnouncement style={{ marginRight: "8px" }} /> Announcement
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Mobile toggle button */}
        <div className="lg:hidden p-4 bg-white shadow flex justify-between items-center">
          <button onClick={() => setIsOpen(true)} className="text-[18px]">
            ☰
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
