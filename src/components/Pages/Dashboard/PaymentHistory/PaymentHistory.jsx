import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../Shared/Loadings/Loading";
import PaymentHistoryTable from "./PaymentHistoryTable/PaymentHistoryTable";

const PaymentHistory = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosInstance(`/my-payment-history/${user?.email}`);
      return res?.data;
    },
  });

  const { data: apartmentInfo = {} } = useQuery({
    queryKey: ["apartment-info", user?.email],
    queryFn: async () => {
      const res = await axiosInstance(`/apartment-info/${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Payment History
      </h2>

      {paymentHistory.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full mb-6 border-none">
            <thead>
              <tr>
                <th>Month</th>
                <th>Coupon Code</th>
                <th>Final Rent (৳)</th>
                <th>Transaction ID</th>
                <th>Payment Status</th>
                <th>Paid At</th>
                <th>Floor No</th>
                <th>Block Name</th>
                <th>Apartment No</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {paymentHistory.map((payment) => (
                <PaymentHistoryTable
                  key={payment._id}
                  className="border-none"
                  payment={payment}
                  apartmentInfo={apartmentInfo}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
