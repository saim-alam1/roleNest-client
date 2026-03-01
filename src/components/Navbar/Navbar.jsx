import { Link, NavLink } from "react-router";
import logo from "../../assets/management.png";
import useIsActive from "../../Hooks/useIsActive";
import { useState } from "react";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={useIsActive}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/apartment" className={useIsActive}>
          Apartment
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className={`dropdown ${open ? "dropdown-open" : ""}`}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/">
          <span className="flex items-start justify-center gap-2">
            <img src={logo} alt="Website Logo Image" className="h-6" />
            <h4 className="text-xl font-bold">RoleNest</h4>
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end flex items-center gap-5">
        {/* Profile */}
        <div className="avatar cursor-pointer">
          <div className="color-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
            <img
              src="https://i.ibb.co.com/NPvRDsd/user.png"
              alt="Default Profile Image"
            />
          </div>
        </div>
        {/* LogIn Button */}
        <button className="text-base btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white">
          <span className="flex items-center justify-center gap-1">
            <h4>Login</h4>
            <IoLogIn className="text-3xl" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
