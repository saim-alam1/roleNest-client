import { use } from "react";
import { AuthContext } from "../../../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loadings/Loading";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-profile-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/admin-profile-stats/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Admin Profile
      </h2>
      <div className="max-w-5xl mx-auto shadow-md rounded-2xl p-8 border border-base-300">
        {/* Admin Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 mb-8">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="text-base-content">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-md p-5">
            <h3 className="font-semibold">Total Rooms</h3>
            <p className="text-2xl font-bold">{data.totalRooms}</p>
          </div>

          <div className="card bg-base-200 shadow-md p-5">
            <h3 className="font-semibold">Available Rooms</h3>
            <p className="text-2xl font-bold">{data.availablePercentage}%</p>
          </div>

          <div className="card bg-base-200 shadow-md p-5">
            <h3 className="font-semibold">Unavailable Rooms</h3>
            <p className="text-2xl font-bold">{data.unavailablePercentage}%</p>
          </div>

          <div className="card bg-base-200 shadow-md p-5">
            <h3 className="font-semibold">Users</h3>
            <p className="text-2xl font-bold">{data.totalUsers}</p>
          </div>

          <div className="card bg-base-200 shadow-md p-5">
            <h3 className="font-semibold">Members</h3>
            <p className="text-2xl font-bold">{data.totalMembers}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
