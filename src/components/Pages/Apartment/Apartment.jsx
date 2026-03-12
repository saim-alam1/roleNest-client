import { useQuery } from "@tanstack/react-query";
import Loading from "../Loadings/Loading";
import Card from "../Shared/Card/Card";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";

const Apartment = () => {
  const axiosInstance = useAxios();
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: countData = {} } = useQuery({
    queryKey: ["apartment-count"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "http://localhost:3000/apartment-count",
      );
      return res.data;
    },
  });

  const totalApartments = countData?.count || 0;
  const totalPages = Math.ceil(totalApartments / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  const {
    data: apartmentsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apartments", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `http://localhost:3000/apartments?page=${currentPage}&limit=${itemsPerPage}`,
      );
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
      <div className="flex justify-center mt-10 gap-2 flex-wrap">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="btn btn-sm"
        >
          ← Prev
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="btn btn-sm"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default Apartment;
