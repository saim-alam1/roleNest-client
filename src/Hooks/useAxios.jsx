import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// const axiosInstance = axios.create({
//   baseURL: "https://role-nest-server.vercel.app",
// });

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
