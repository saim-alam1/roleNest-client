import { use, useState } from "react";
import { AuthContext } from "../../../../../Contexts/AuthContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../../../../Hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loadings/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PaymentForm = () => {
  const { user } = use(AuthContext);
  const stripe = useStripe();
  const navigate = useNavigate();
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

  const [discountedRent, setDiscountedRent] = useState(0);
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

  const finalRent = appliedCoupon ? discountedRent : rent;
  const amountInPoisha = finalRent * 100;

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

    // const finalRent = appliedCoupon ? discountedRent : rent;

    const res = await axiosInstance.post("create-payment-intent", {
      amountInPoisha,
      applicantEmail: user?.email,
    });

    console.log("res from intent", res);

    const clientSecret = res?.data?.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded");
        console.log(result);
      }
    }

    storePaymentInfo.mutate({
      couponCode: appliedCoupon || null,
      finalRent,
    });
  };

  const storePaymentInfo = useMutation({
    mutationFn: async (paymentInfo) => {
      await axiosInstance.patch(`/payment-info/${user?.email}`, paymentInfo);
    },
    onSuccess: () => {
      // navigate(`/dashboard/payment-history`);
    },
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
