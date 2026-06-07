import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loadings/Loading";

const Coupons = () => {
  const axiosInstance = useAxios();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosInstance("/coupons");
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-heading mb-4">
          🎁 Available Coupons
        </h2>
        <p className="description-text max-w-[90%] mx-auto text-lg leading-relaxed">
          Grab this exclusive offer and save big! Use the code at checkout and
          enjoy your discount or free service before it expires. The date by
          which the coupon must be used before it becomes invalid.
        </p>
      </div>
      <div className="w-full px-4 py-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          speed={800}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {coupons.map((coupon, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-100 shadow-lg border border-gray-200 p-6 flex flex-col justify-between h-39.75">
                <h2 className="text-xl font-bold text-center mb-2">
                  {coupon.discountPercentage}% Off
                </h2>
                <p className="text-center font-mono mb-2">
                  Code:{" "}
                  <span className="text-primary font-bold">
                    {coupon.couponCode}
                  </span>
                </p>
                <p className="text-center text-sm text-gray-500">
                  {coupon.couponDescription}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Coupons;
