import { motion } from "framer-motion";

const Card = ({ apartmentsCard }) => {
  const { apartmentImage, apartmentNo, blockName, floorNo, rent } =
    apartmentsCard;

  const handleAgreement = () => {
    console.log("agreement");
  };

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
          <p className="color-primary text-lg font-semibold">{floorNo}</p>
          <p className="color-primary text-lg font-semibold">{blockName}</p>
          <p className="text-red-500"> {rent}৳</p>
        </div>
      </div>
      {/* Button */}
      <div className="w-11/12 mx-auto my-4">
        <button
          onClick={handleAgreement}
          className="text-base mt-1 btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white shadow-none w-full"
        >
          Agreement
        </button>
      </div>
    </section>
  );
};

export default Card;
