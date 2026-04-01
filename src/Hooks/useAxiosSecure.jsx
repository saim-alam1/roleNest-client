import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOutUser } = use(AuthContext);

  // Request Interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      // console.log(error);
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logOutUser()
          .then(() => {
            toast.success(
              `Signout user for ${error.response?.status} status code`,
            );
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(`${errorMessage}`);
          });
      }
      // console.log("Status:", error.response?.status);

      return Promise.reject(error);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
