import { Link, NavLink } from "react-router";
import logo from "../../../assets/management.png";
import { useState, useEffect } from "react";
import { IoLogIn } from "react-icons/io5";
import getNavLinkClasses from "../../Utils/getNavLinkClasses";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true); // navbar visibility
  const [scrollY, setScrollY] = useState(0); // last scroll position

  const navLinks = ({ isGlassy }) => {
    return (
      <>
        <li>
          <NavLink
            to="/"
            className={(navData) =>
              getNavLinkClasses({ isActive: navData.isActive, isGlassy })
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/apartment"
            className={(navData) =>
              getNavLinkClasses({ isActive: navData.isActive, isGlassy })
            }
          >
            Apartment
          </NavLink>
        </li>
      </>
    );
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 0) return;

      // Hide if scrolling down
      if (currentScroll > scrollY && currentScroll > 50) {
        setShow(false);
      }
      // Show if scrolling up
      else if (currentScroll < scrollY) {
        setShow(true);
      }

      setScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } ${
        scrollY > 50 && show
          ? "bg-white/20 backdrop-blur-md shadow-md"
          : "bg-base-100 shadow-sm"
      }`}
    >
      <div className="navbar max-w-480 mx-auto px-4 sm:px-6 lg:px-10">
        {/* Start */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
              {navLinks({ isGlassy: scrollY > 50 && show, isMobile: true })}
            </ul>
          </div>
          <Link to="/">
            <span className="flex items-start justify-center gap-2">
              <img src={logo} alt="Website Logo" className="h-6" />
              <h4 className="text-xl font-bold">
                Role<span className="color-primary">Nest</span>
              </h4>
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks({ isGlassy: scrollY > 50 && show })}
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end flex items-center gap-5">
          <div className="avatar cursor-pointer">
            <div className="color-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                src="https://i.ibb.co.com/NPvRDsd/user.png"
                alt="Default Profile Image"
              />
            </div>
          </div>
          <Link
            to="/auth-Layout/login"
            className="text-base btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white shadow-none"
          >
            <span className="flex items-center justify-center gap-1">
              <h4>Login</h4>
              <IoLogIn className="text-3xl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
