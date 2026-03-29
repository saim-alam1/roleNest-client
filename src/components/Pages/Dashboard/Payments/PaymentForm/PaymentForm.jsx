import { use } from "react";
import { AuthContext } from "../../../../../Contexts/AuthContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../../../../Hooks/useAxios";

const PaymentForm = () => {
  const { user } = use(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();

  const handlePay = (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;
  };

  return (
    <form onSubmit={handlePay} className="mt-8 flex items-center gap-3">
      <CardElement className="p-4 border border-gray-300 rounded-lg w-full" />

      <button type="submit" disabled={!stripe} className="btn btn-primary">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
