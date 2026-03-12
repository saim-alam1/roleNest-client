import { motion } from "framer-motion";
import { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const Card = ({ apartmentsCard, alreadyRequested, setAlreadyRequested }) => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { apartmentImage, apartmentNo, blockName, floorNo, rent } =
    apartmentsCard;

  const handleAgreement = () => {
    if (!user?.email) {
      return navigate("/auth-Layout/login", { state: location.pathname });
    }
    const agreementData = {
      userName: user?.displayName,
      userEmail: user?.email,
      floorNo,
      blockName,
      apartmentNo,
      rent,
    };
    agreementMutation.mutate(agreementData);
  };

  // Implement JWT
  const agreementMutation = useMutation({
    mutationFn: async (data) =>
      await axios.post("http://localhost:3000/resident", data),
    onSuccess: () => {
      setAlreadyRequested(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sent request to admin",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.log("Card", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Agreement request failed",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  return (
    <section className="overflow-hidden bg-base-100 shadow-lg border border-gray-200 rounded-xl">
      <motion.img
        className="h-64 object-cover w-full"
        src={apartmentImage}
        alt="Apartment Images"
        whileHover={{ scale: 1.1, marginBottom: "4px" }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      <div className="mt-6 text-heading text-center flex items-center justify-center gap-4">
        {/* Box 1 */}
        <div className=" space-y-2 text-lg font-semibold">
          <p>Apartment No:</p>
          <p>Block Name :</p>
          <p>Floor No:</p>
          <p>Rent Amount:</p>
        </div>

        {/* Box 2 */}
        <div className="text-heading flex flex-col text-lg space-y-2">
          <p className="color-primary text-lg font-semibold">{apartmentNo}</p>
          <p className="color-primary text-lg font-semibold">{blockName}</p>
          <p className="color-primary text-lg font-semibold">{floorNo}</p>
          <p className="text-red-500 text-lg font-semibold"> {rent}৳</p>
        </div>
      </div>
      {/* Button */}
      <div className="w-11/12 mx-auto my-4">
        <button
          onClick={handleAgreement}
          disabled={alreadyRequested || agreementMutation.isPending}
          className={`text-base mt-1 btn border-none w-full shadow-none
    ${
      alreadyRequested || agreementMutation.isPending
        ? "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
        : "bg-[#2563eb] text-white hover:bg-[#1550cf]"
    }`}
        >
          {alreadyRequested
            ? "Request only once"
            : agreementMutation.isPending
              ? "Sending Request..."
              : "Agreement"}
        </button>
      </div>
    </section>
  );
};

export default Card;
