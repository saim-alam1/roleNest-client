import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import Loading from "../../../Shared/Loadings/Loading";
import AgreementTable from "./AgreementInfo/AgreementTable";

const AgreementRequests = () => {
  const axiosInstance = useAxios();

  const { data: agreementApplications = [], isLoading } = useQuery({
    queryKey: ["agreement-applications"],
    queryFn: async () => {
      const res = await axiosInstance(`/agreement-requests`);
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9 space-y-12">
      <div>
        <h2 className="text-4xl font-bold text-heading text-center">
          Agreement Requests
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow w-full">
        <table className="table table-zebra">
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
              <AgreementTable key={application._id} application={application} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AgreementRequests;
