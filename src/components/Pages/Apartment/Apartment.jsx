import { useQuery } from "@tanstack/react-query";
import Card from "../Shared/Card/Card";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";
import Lottie from "lottie-react";
import noDataFound from "../../../assets/noDataFound.json";
import Loading from "../Shared/Loadings/Loading";

const Apartment = () => {
  const axiosInstance = useAxios();
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");

  // Apartment Count Number
  const { data: countData = {} } = useQuery({
    queryKey: ["apartment-count"],
    queryFn: async () => {
      const res = await axiosInstance.get("/apartment-count");
      return res.data;
    },
  });

  const totalApartments = countData?.count || 0;
  const totalPages = Math.ceil(totalApartments / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  // Apartment Data
  const {
    data: apartmentsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["apartments", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/apartments?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return "An error has occurred: " + error.message;

  // The Search Feature
  const filteredApartments = apartmentsData.filter((apartment) => {
    const rent = apartment?.rent;
    if (minRent && rent < parseInt(minRent)) return false;
    if (maxRent && rent > parseInt(maxRent)) return false;

    return true;
  });

  return (
    <section className="my-28 px-3">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-heading mb-4">
          Available Apartments
        </h2>
        <p className="description-text max-w-[90%] mx-auto text-lg leading-relaxed">
          ✨ STUNNING MODERN FLAT - HEART OF Dhaka. <br />
          Start booking hot deals currently available. Use coupon codes to get
          exclusive discounts on you dream apartments.
        </p>
      </div>

      {/* Range */}
      <div className="my-14 text-heading text-center max-w-9/12 mx-auto">
        <h4 className="text-[16px] font-bold text-heading mb-4">
          Search Your Rent Range
        </h4>
        <div className="flex items-center gap-1.5 justify-end">
          <input
            type="number"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            placeholder="Minimum"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
          <span>-</span>
          <input
            type="number"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            placeholder="Maximum"
            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApartments.length === 0 && (minRent || maxRent) && (
          <div className="col-span-full flex flex-col items-center justify-center flex-1 my-8 space-y-4">
            <Lottie animationData={noDataFound} className="w-full max-w-md" />
            <p className="text-center col-span-3  font-semibold">
              ⚠️ No apartments found here.
            </p>
          </div>
        )}

        {filteredApartments.map((apartmentsCard) => (
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
