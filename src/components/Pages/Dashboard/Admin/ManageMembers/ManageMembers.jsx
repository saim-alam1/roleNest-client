import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import Loading from "../../../Shared/Loadings/Loading";

const ManageMembers = () => {
  const axiosInstance = useAxios();
  const { data: members = [], isLoading } = useQuery({
    queryKey: ["loading-member-data"],
    queryFn: async () => {
      const res = await axiosInstance("/manage-members");
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Manage Members</h2>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, index) => (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <td>{member.userName}</td>
                <td>{member.userEmail}</td>
                <td>
                  <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;
