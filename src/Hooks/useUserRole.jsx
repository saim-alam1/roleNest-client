import { use } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isLoading: roleLoading,
    isError: roleError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}/role`);
      return res.data;
    },
    enabled: !!user?.email && !!user?.accessToken,
  });

  return {
    role,
    roleLoading,
    roleError,
  };
};

export default useUserRole;
