import { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loadings/Loading";
import { useState } from "react";
import { useForm } from "react-hook-form";

const MakePayment = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();
  const {
    reset,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: applicantsInfo, isLoading } = useQuery({
    queryKey: ["applicants-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance(`/approved-agreement/${user?.email}`);
      return res?.data;
    },
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance("/coupons");
      return res?.data;
    },
  });

  const { apartmentNo, blockName, floorNo, rent } = applicantsInfo || {};

  const [discountedRent, setDiscountedRent] = useState(rent);

  const handleApplyCoupons = () => {
    const couponInput = getValues("couponCode");

    const matchedCoupon = coupons.find(
      (coupon) => coupon.couponCode === couponInput,
    );

    if (!matchedCoupon) return;

    const discount = (rent * matchedCoupon?.discountPercentage) / 100;
    const finalRent = rent - discount;

    setDiscountedRent(finalRent);
  };

  // Handle Payment
  const handlePayment = (data) => {
    console.log(data);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="my-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Make Payment
      </h2>

      <form
        onSubmit={handleSubmit(handlePayment)}
        className="flex justify-center"
      >
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
              <label className="label">
                Month<span className="text-red-500">*</span>
              </label>
              <select
                defaultValue=""
                className="select select-bordered w-full"
                {...register("month", { required: true })}
              >
                <option value="" disabled>
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
              {errors.month && (
                <p className="text-sm text-red-500 font-medium mt-1">
                  Month Is Required
                </p>
              )}
            </div>
          </div>

          {/* Coupon Section */}
          <div className="mt-8">
            <label className="label">Apply Coupon</label>

            <div className="flex gap-3">
              <input
                type="text"
                {...register("couponCode")}
                placeholder="Enter coupon code"
                className="input input-bordered w-full"
              />

              <button
                type="button"
                onClick={handleApplyCoupons}
                className="btn btn-outline btn-primary"
              >
                Apply
              </button>
            </div>

            {discountedRent > 0 && discountedRent !== rent && (
              <p className="mt-3 text-sm color-primary font-medium">
                Payable Amount After Discount: ৳ {discountedRent}
              </p>
            )}
          </div>

          {/* Pay Button */}
          <div className="mt-8 text-right">
            <button className="btn btn-primary px-8">Pay Now</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MakePayment;
