import { Link, NavLink } from "react-router";
import logo from "../../assets/management.png";
import { FiLogIn } from "react-icons/fi";
import useIsActive from "../../Hooks/useIsActive";

const Navbar = () => {
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
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
      <div className="navbar-end">
        {/* LogIn Button */}
        <button className="text-xl btn border-none">
          <span className="flex items-center justify-center gap-2">
            <h4>Login</h4>
            <FiLogIn className="w-5" />
          </span>
        </button>
        {/* Profile */}
      </div>
    </div>
  );
};

export default Navbar;
