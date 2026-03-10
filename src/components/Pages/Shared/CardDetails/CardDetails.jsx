import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../Loadings/Loading";
import useAxios from "../../../../Hooks/useAxios";

const CardDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: apartment = [], isLoading } = useQuery({
    queryKey: ["apartment", id],
    queryFn: async () => {
      const res = await axiosInstance(`http://localhost:3000/apartments/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  const { apartmentImage, apartmentNo, blockName, floorNo, rent } = apartment;

  return (
    <div className="my-28 px-3">
      <div className="card card-side my-7 flex flex-col md:grid md:grid-cols-2 md:gap-3 md:items-center">
        <figure className="w-full h-full">
          <img className="rounded-lg" src={apartmentImage} alt="Food Image" />
        </figure>
        <div className="card-body space-y-4">
          <p className="text-xl">
            Apartment No: <span className="font-semibold">{apartmentNo}</span>
          </p>
          <p className="text-xl">
            Block No: <span className="font-semibold">{blockName}</span>
          </p>
          <p className="text-xl">
            Floor No: <span className="font-semibold">{floorNo}</span>
          </p>
          <p className="text-xl">
            Rent: <span className="font-semibold text-red-500">{rent}৳</span>
          </p>
          <div className="card-actions">
            <button className="text-base btn border-none bg-[#2563eb] hover:bg-[#1550cf] delay-100 text-white shadow-none">
              Agreement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
