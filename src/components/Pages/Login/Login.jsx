import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/Login.json";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loadings/Loading";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loading, loginUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  const handleLogin = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          title: "Error!",
          text: `${errorMessage}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen max-w-7xl mx-auto rounded-b-xl">
      <div className="hero-content flex-col justify-around w-full lg:flex-row-reverse">
        {/* Lottie Animation */}
        <Lottie animationData={loginAnimation} className="w-full max-w-md" />
        {/* Login Form */}
        <div className="card w-full max-w-sm shrink-0">
          <div className="card-body">
            <h3 className="text-center text-3xl font-bold my-2.5">
              Please Login
            </h3>
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="fieldset space-y-4"
            >
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span>
                  <p className="text-red-500">Email field is required</p>
                </span>
              )}
              {/* Password */}
              <div className="relative">
                <label className="label">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <button
                  onClick={() => setShow(!show)}
                  type="button"
                  className="cursor-pointer text-[20px] absolute bottom-2.5 right-7"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <span>
                  <p className="text-red-500">Password field is required</p>
                </span>
              )}
              <div>
                <p className="text-[14px] pt-2">
                  Don't have account?{" "}
                  <Link
                    className="link link-hover text-[#0055eb]"
                    to={"/auth-Layout/register"}
                  >
                    Register
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="text-base btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white shadow-none"
              >
                Login
              </button>
            </form>
            <div className="text-center">
              <p className="font-bold text-xl py-1.5">Or</p>
              {/* Google Button */}
              <button className="btn bg-white text-black border-[#e5e5e5] w-full">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
