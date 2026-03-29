import { use, useState } from "react";
import { AuthContext } from "../../../../../Contexts/AuthContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../../../../Hooks/useAxios";

const PaymentForm = () => {
  const { user } = use(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosInstance = useAxios();
  const [error, setError] = useState("");

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
  };

  return (
    <form onSubmit={handlePay} className="mt-8gap-3">
      <CardElement className="p-4 border border-gray-300 rounded-lg w-full" />

      <button type="submit" disabled={!stripe} className="btn btn-primary my-4">
        Pay Now
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
