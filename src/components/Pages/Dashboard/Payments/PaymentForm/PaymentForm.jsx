import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Contexts/AuthContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../../../../Hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loadings/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const { user } = use(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const [error, setError] = useState("");
  const { register, getValues } = useForm();

  const { data: applicantsInfo, isLoading } = useQuery({
    queryKey: ["applicants-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance(`/approved-agreement/${user?.email}`);
      return res?.data;
    },
  });

  const { rent } = applicantsInfo || {};

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance("/coupons");
      return res?.data;
    },
  });

  const [discountedRent, setDiscountedRent] = useState(rent || 0);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const handleApplyCoupons = () => {
    const couponInput = getValues("couponCode");

    if (!couponInput) {
      setDiscountedRent(rent);
      setAppliedCoupon("");
      setCouponError("");
      return;
    }

    const matchedCoupon = coupons.find(
      (coupon) => coupon.couponCode === couponInput,
    );

    if (!matchedCoupon) {
      setCouponError("This coupon don't exist");
      setDiscountedRent(rent);
      setAppliedCoupon("");
      return;
    }

    setCouponError("");

    const discount = (rent * matchedCoupon?.discountPercentage) / 100;
    const finalRent = rent - discount;

    setDiscountedRent(finalRent);
    setAppliedCoupon(couponInput);
  };

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("paymentMethod", paymentMethod);
    }

    const paymentInfo = {
      couponCode: appliedCoupon || null, // null if no coupon
      finalRent: discountedRent || rent, // use discounted or original rent
    };

    console.log(paymentInfo);

    storePaymentInfo.mutate(paymentInfo);
  };

  const storePaymentInfo = useMutation({
    mutationFn: async (paymentInfo) => {
      await axiosInstance.patch(`/payment-info/${user?.email}`, paymentInfo);
    },
    onSuccess: () => {},
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handlePay} className="mt-8 space-y-4">
      {/* Coupon Section */}
      <div className="mt-8">
        <label className="label">Apply Coupon</label>

        <div className="flex gap-3">
          <input
            type="text"
            onChange={(e) => setCouponInput(e.target.value)}
            {...register("couponCode")}
            placeholder="Enter coupon code"
            className="input input-bordered w-full"
          />

          <button
            type="button"
            onClick={handleApplyCoupons}
            className="btn border border-[#2563eb] hover:bg-[#2563eb] hover:text-white delay-100"
          >
            Apply
          </button>
        </div>

        {couponError && (
          <p className="text-red-500 text-sm mt-2">{couponError}</p>
        )}

        {discountedRent > 0 && discountedRent !== rent && (
          <p className="mt-3 text-sm color-primary font-medium">
            Payable Amount After Discount: ৳ {discountedRent}
          </p>
        )}
      </div>

      <CardElement className="p-4 border border-gray-300 rounded-lg w-full" />

      <button
        type="submit"
        disabled={!stripe}
        className="btn text-white bg-[#2563eb] hover:bg-[#0c53ec] my-4"
      >
        Pay ৳ {discountedRent || rent} Now
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
