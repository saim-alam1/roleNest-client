import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../../../assets/Login.json";
import { useForm } from "react-hook-form";
import uploadProfileImg from "../../../assets/image-upload-icon.png";
import { AuthContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Loadings/Loading";
import axios from "axios";
import GoogleLogin from "../Shared/GoogleLogin/GoogleLogin";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const { loading, registerUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  // Monitoring the Icon Image Field
  const image = watch("image");

  const handleRegister = async (data) => {
    const { email, name, password } = data;

    registerUser(email, password)
      .then(async () => {
        // Update User Info In Firebase
        const userProfile = {
          displayName: name,
          photoURL: profilePic,
        };
        await updateUserProfile(userProfile)
          .then(() => console.log("profile name picture updated"))
          .catch((error) => console.log(error));

        // Collect User's Role
        const userInfo = {
          userName: name,
          userEmail: email,
        };
        const postUserInfo = await axiosInstance.post("/users", userInfo);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    const imgUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

    const res = await axios.post(imgUploadURL, formData);
    setProfilePic(res.data?.data?.display_url);
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
                className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
              >
                {image?.length > 0 ? (
                  <img
                    src={URL.createObjectURL(image[0])}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                ) : (
                  <>
                    <img
                      src={uploadProfileImg}
                      alt="Upload"
                      className="w-32 h-32 mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      Click or drag & drop to upload
                    </p>
                  </>
                )}

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", {
                    required: true,
                    onChange: handleImageUpload,
                  })}
                />
              </label>

              {errors.image && (
                <p className="text-[16px] text-red-500 mt-1">
                  Profile image is required
                </p>
              )}

              {/* Name */}
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
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
                  className="input"
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

                {/* input + icon wrapper */}
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

export default Register;
