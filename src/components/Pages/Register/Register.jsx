import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/Login.json";
import { useForm } from "react-hook-form";
import uploadProfileImg from "../../../assets/image-upload-icon.png";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

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
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="fieldset space-y-4"
            >
              {/* Image Upload Icon */}
              <label
                htmlFor="profileImage"
                className="flex flex-col items-center justify-center w-full h-40  cursor-pointer"
              >
                <img
                  src={uploadProfileImg}
                  alt="Image Upload Field"
                  className="w-32 h-32 mb-2"
                />
                <p className="text-sm text-gray-500">
                  Click or drag & drop to upload
                </p>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", { required: true })}
                />
              </label>

              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 my-1">
                    Name field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 my-1">
                    Email field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    className="input w-full pr-10"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[20px] cursor-pointer"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[14px] pt-2">
                  Already have account?{" "}
                  <Link
                    className="link link-hover text-[#0055eb]"
                    to={"/auth-Layout/login"}
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
