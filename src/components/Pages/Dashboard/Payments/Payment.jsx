import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm/PaymentForm";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = () => {
  return (
    <section className="my-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Make Payment
      </h2>

      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </section>
  );
};

export default Payment;
