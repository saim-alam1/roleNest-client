import { useQuery } from "@tanstack/react-query";
import Loading from "../Loadings/Loading";
import Card from "../Shared/Card/Card";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";

const Apartment = () => {
  const axiosInstance = useAxios();
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const {
    data: apartmentsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:3000/apartments");
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="my-28 px-3">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-heading mb-4">
          Available Apartments
        </h2>
        <p className="description-text max-w-[90%] mx-auto text-lg leading-relaxed">
          ✨ STUNNING MODERN FLAT - HEART OF Dhaka. <br />
          Start booking hot deals currently available. Use coupon codes to get
          exclusive discounts on you dream apartments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartmentsData.map((apartmentsCard) => (
          <Card
            key={apartmentsCard._id}
            apartmentsCard={apartmentsCard}
            alreadyRequested={alreadyRequested}
            setAlreadyRequested={setAlreadyRequested}
          />
        ))}
      </div>
    </section>
  );
};

export default Apartment;
