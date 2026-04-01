import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loadings/Loading";
import { toast } from "react-toastify";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["loading-member-data"],
    queryFn: async () => {
      const res = await axiosSecure("/manage-members");
      return res?.data;
    },
  });

  const handleRemoveMember = (email) => {
    Confirm.show(
      "Remove Member",
      "Are you sure you want to remove this member?",
      "Yes",
      "No",
      () => {
        removeMember.mutate(email);
      },
      () => {},
      {},
    );
  };

  const removeMember = useMutation({
    mutationFn: async (memberEmail) => {
      await axiosSecure.patch(`/remove-member/${memberEmail}`);
    },
    onSuccess: () => {
      toast.success("Successfully Removed Member");
      refetch();
    },
    onError: () => {
      toast.error("Something Went Wrong");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="p-4 md:p-6">
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
                  <button
                    onClick={() => handleRemoveMember(member?.userEmail)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageMembers;
