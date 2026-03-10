import { motion } from "framer-motion";

const Card = ({ apartmentsCard }) => {
  console.log(apartmentsCard);

  const { apartmentImage, apartmentNo, blockName, floorNo, rent } =
    apartmentsCard;

  return (
    <div className="overflow-hidden bg-base-100 shadow-lg border border-gray-200 rounded-xl">
      <motion.img
        className="h-64 object-cover w-full"
        src={apartmentImage}
        alt="Apartment Images"
        whileHover={{ scale: 1.1, marginBottom: "4px" }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      <div className="p-6 text-heading">
        <div className="text-center space-y-2 text-[16px]">
          <p className="font-semibold">
            Apartment No: <span className="color-primary">{apartmentNo}</span>
          </p>
          <p className="font-semibold">
            Block Name: <span className="color-primary">{blockName}</span>
          </p>
          <p className="font-semibold">
            Floor No: <span className="color-primary">{floorNo}</span>
          </p>
          <p className="font-semibold">
            Rent:
            <span className="text-red-500"> {rent}৳</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
