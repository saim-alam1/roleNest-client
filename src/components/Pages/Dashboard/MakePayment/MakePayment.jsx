import { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loadings/Loading";

const MakePayment = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  const { data: applicantsInfo, isLoading } = useQuery({
    queryKey: ["applicants-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance(`/approved-agreement/${user?.email}`);
      return res?.data;
    },
  });

  const { apartmentNo, blockName, floorNo, rent } = applicantsInfo || {};

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Make Payment
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8">
          <h3 className="text-2xl font-semibold text-heading mb-6">
            Apartment Payment Information
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="label">Member Email</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Floor</label>
              <input
                type="text"
                value={floorNo || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Block Name</label>
              <input
                type="text"
                value={blockName || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Apartment No</label>
              <input
                type="text"
                value={apartmentNo || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Rent</label>
              <input
                type="text"
                value={rent || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Month</label>
              <select className="select select-bordered w-full">
                <option disabled defaultValue="">
                  Select Month
                </option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="mt-8">
            <label className="label">Apply Coupon</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="input input-bordered w-full"
              />
              <button className="btn btn-outline btn-primary">Apply</button>
            </div>
          </div>

          {/* Pay Button */}
          <div className="mt-8 text-right">
            <button className="btn btn-primary px-8">Pay Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakePayment;
