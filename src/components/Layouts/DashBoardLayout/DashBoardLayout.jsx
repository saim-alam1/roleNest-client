import { use } from "react";
import { AuthContext } from "../../../Contexts/AutContext";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/management.png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";

const DashBoardLayout = () => {
  const { user } = use(AuthContext);

  return (
    <div>
      <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r border-gray-200">
        <Link to="/">
          <span className="flex items-start justify-center gap-2">
            <img src={logo} alt="Website Logo" className="h-6" />
            <h4 className="text-xl font-bold">
              Role<span className="color-primary">Nest</span>
            </h4>
          </span>
        </Link>

        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full ring-2 ring-blue-500 p-1"
            src={user?.photoURL}
            alt="User Image"
          />
          <h4 className="mx-2 mt-2 font-semibold text-heading">
            {user.displayName}
          </h4>
          <p className="mx-2 mt-1 text-sm description-text">{user?.email}</p>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-[#2563EB] font-medium"
                    : "text-[#374151] hover:bg-blue-50 hover:text-[#2563EB]"
                } flex items-center px-4 py-2`
              }
            >
              <MdOutlineSpaceDashboard />

              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              to="my-profile"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-[#2563EB] font-medium"
                    : "text-[#374151] hover:bg-blue-50 hover:text-[#2563EB]"
                } flex items-center px-4 py-2`
              }
            >
              <FaRegUser />

              <span className="mx-4 font-medium">My Profile</span>
            </NavLink>

            <NavLink
              to="announcement"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-blue-50 text-[#2563EB] font-medium"
                    : "text-[#374151] hover:bg-blue-50 hover:text-[#2563EB]"
                } flex items-center px-4 py-2`
              }
            >
              <TfiAnnouncement />

              <span className="mx-4 font-medium">Announcement</span>
            </NavLink>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default DashBoardLayout;
