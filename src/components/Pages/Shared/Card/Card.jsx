const Card = ({ apartmentsCard }) => {
  console.log(apartmentsCard);

  const { apartmentImage, apartmentNo, blockName, floorNo, rent } =
    apartmentsCard;

  return (
    <div className="overflow-hidden bg-base-100 shadow-lg border border-gray-200 rounded-xl">
      <img
        className="object-cover w-full h-64"
        src={apartmentImage}
        alt="Apartment Images"
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
