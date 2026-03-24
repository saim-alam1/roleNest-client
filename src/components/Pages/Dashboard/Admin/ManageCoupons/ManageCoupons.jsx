import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import CouponTable from "./CouponTable";
import Loading from "../../../Shared/Loadings/Loading";

const ManageCoupons = () => {
  const axiosInstance = useAxios();

  const { data: loadCoupons = [], isLoading } = useQuery({
    queryKey: ["load-coupons"],
    queryFn: async () => {
      const res = await axiosInstance("/coupons");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9 space-y-12">
      <h2 className="text-4xl font-bold text-heading text-center">
        Coupons Info
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow w-full">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL. No.</th>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Coupon Description</th>
            </tr>
          </thead>

          <tbody>
            {loadCoupons.map((couponData, index) => (
              <CouponTable
                key={couponData._id}
                couponData={couponData}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageCoupons;
