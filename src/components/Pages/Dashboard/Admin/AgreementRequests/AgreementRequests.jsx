import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import Loading from "../../../Shared/Loadings/Loading";
import AgreementTable from "./AgreementInfo/AgreementTable";
import { toast } from "react-toastify";

const AgreementRequests = () => {
  const axiosInstance = useAxios();

  const {
    data: agreementApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreement-applications"],
    queryFn: async () => {
      const res = await axiosInstance(`/agreement-requests`);
      return res?.data;
    },
  });

  const acceptAgreementMutation = useMutation({
    mutationFn: async (applicantEmail) => {
      return await axiosInstance.patch(`/accept-agreement/${applicantEmail}`);
    },
    onSuccess: () => {
      toast.success("Agreement accepted! User role updated.");
      refetch();
    },
    onError: (error) => {
      toast.error(`Server error: ${error.message}`);
    },
  });

  const rejectAgreementMutation = useMutation({
    mutationFn: async (applicantEmail) => {
      return await axiosInstance.patch(`/reject-agreement/${applicantEmail}`);
    },
    onSuccess: () => {
      toast.success("Agreement Rejected. Request Removed");
      refetch();
    },
    onError: (error) => {
      toast.error(`Server error: ${error.message}`);
    },
  });

  const handleAcceptAgreement = (applicantEmail) => {
    acceptAgreementMutation.mutate(applicantEmail);
  };

  const handleRejectAgreement = (applicantEmail) => {
    rejectAgreementMutation.mutate(applicantEmail);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9 space-y-12 min-w-auto mx-3">
      <h2 className="text-4xl font-bold text-heading text-center">
        Agreement Requests
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow w-full">
        <table className="table table-zebra min-w-max overflow-x-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Floor</th>
              <th>Block</th>
              <th>Room</th>
              <th>Rent</th>
              <th>Date</th>
              <th>Status</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
            {agreementApplications.map((application) => (
              <AgreementTable
                key={application._id}
                application={application}
                handleAcceptAgreement={handleAcceptAgreement}
                handleRejectAgreement={handleRejectAgreement}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AgreementRequests;
