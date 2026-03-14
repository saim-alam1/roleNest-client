import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUserRole = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  const {
    data: role = null,
    isLoading: roleLoading,
    isError: roleError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = axiosInstance.get(`/user/${user?.email}/role`);
      console.log(res);
    },
  });

  return {
    role,
    roleLoading,
    roleError,
  };
};

export default useUserRole;
