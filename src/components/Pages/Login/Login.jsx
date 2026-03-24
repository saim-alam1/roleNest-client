import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/Login.json";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Contexts/AuthContext";
import GoogleLogin from "../Shared/GoogleLogin/GoogleLogin";
import Loading from "../Shared/Loadings/Loading";
import { toast } from "react-toastify";

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
        toast.success("Logged in successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
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
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
