import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../../Hooks/useAxios";
import CouponTable from "./CouponTable";
import Loading from "../../../Shared/Loadings/Loading";
import { MdNoteAdd } from "react-icons/md";
import { useForm } from "react-hook-form";

const ManageCoupons = () => {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: loadCoupons = [], isLoading } = useQuery({
    queryKey: ["load-coupons"],
    queryFn: async () => {
      const res = await axiosInstance("/coupons");
      return res?.data;
    },
  });

  const handleAddCoupons = (data) => {
    console.log(data);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9 space-y-12 lg:mr-3">
      <h2 className="text-4xl font-bold text-heading text-center">
        Coupons Info
      </h2>

      <div className="flex items-center justify-between">
        <div className="h-2 w-2"></div>
        <div>
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="btn text-[16px] font-semibold border-2 border-[#2563eb] rounded-full hover:bg-[#2563eb] hover:text-white delay-75 transition-all"
          >
            Add <MdNoteAdd />
          </button>
        </div>
      </div>

      {/* Table Area */}
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

      {/* Modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center">
          <h3 className="text-center text-3xl font-bold my-2.5">
            Add New Coupons
          </h3>
          <form
            onSubmit={handleSubmit(handleAddCoupons)}
            className="w-full my-2.5 space-y-4"
          >
            {/* Coupon Code */}
            <div className="flex flex-col space-y-1">
              <label className="label">Coupon Code</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Coupon Code"
                {...register("couponCode", { required: true })}
              />
              {errors.couponCode && (
                <span>
                  <p className="text-red-500 text-[14px]">
                    Coupon Code field is required
                  </p>
                </span>
              )}
            </div>

            {/* Discount Percentage */}
            <div className="flex flex-col space-y-1">
              <label className="label">Discount Percentage</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Discount Percentage"
                {...register("discountPercentage", { required: true })}
              />
              {errors.discountPercentage && (
                <span>
                  <p className="text-red-500 text-[14px]">
                    Discount Percentage field is required
                  </p>
                </span>
              )}
            </div>

            {/* Coupon Description */}
            <div className="flex flex-col space-y-1">
              <label className="label">Coupon Description</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Discount Percentage"
                {...register("couponDescription", { required: true })}
              />
              {errors.couponDescription && (
                <span>
                  <p className="text-red-500 text-[14px]">
                    Coupon Description field is required
                  </p>
                </span>
              )}
            </div>

            <div className="w-full flex items-center justify-around">
              <button
                type="submit"
                className="btn border-none shadow-none bg-green-400 w-full"
              >
                Publish
              </button>
            </div>
          </form>

          <div className="w-full mt-3">
            <form
              method="dialog"
              className="w-full flex items-center justify-center"
            >
              <button className="btn border-none shadow-none bg-red-400 w-full">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default ManageCoupons;
