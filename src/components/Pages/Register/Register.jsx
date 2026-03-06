import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/Login.json";

const Register = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="hero bg-base-200 min-h-screen rounded-b-xl">
      <div className="hero-content flex-col  justify-around w-full lg:flex-row-reverse">
        {/* Lottie Animation */}
        <Lottie animationData={loginAnimation} className="w-full max-w-md" />
        {/* Reg. Form */}
        <div className="card w-full max-w-sm shrink-0">
          <div className="card-body">
            <h3 className="text-center text-3xl font-bold my-2.5">
              Please Register
            </h3>
            <form className="fieldset space-y-4">
              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your name"
                  name="name"
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>
              {/* Password */}
              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="cursor-pointer text-[20px] absolute bottom-2.5 right-7"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <div>
                <p className="text-[14px] pt-2">
                  Already have account?{" "}
                  <Link
                    className="link link-hover text-[#0055eb]"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="text-base btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white shadow-none"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
