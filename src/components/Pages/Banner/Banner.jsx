import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import building1 from "../../../assets/1.jpg";
import building2 from "../../../assets/2.jpg";
import building3 from "../../../assets/3.jpg";
import building4 from "../../../assets/4.jpg";
import building5 from "../../../assets/5.jpg";

const slides = [
  {
    image: building1,
    title: "Get Exclusive Deals 40% Discounts",
    description:
      "Simplify property management with an intelligent system designed for owners, tenants, and administrators.",
  },
  {
    image: building2,
    title: "Centralized Control",
    description:
      "Access real-time data, track activities, and manage building operations from a single, unified platform.",
  },
  {
    image: building3,
    title: "Energy Optimization",
    description:
      "Reduce energy costs using automated scheduling and occupancy sensors. Utilities and lower expenses with AI intelligent.",
  },
  {
    image: building4,
    title: "Maintenance Efficiency",
    description:
      "Detect faults early and maintain systems proactively. Stay ahead of repairs with smart organized workflows.",
  },
  {
    image: building5,
    title: "Safety & Security Integration",
    description:
      "Integrate CCTV, fire alarms and access control seamlessly. Protect residents and assets with modern, centralized safety management.",
  },
];

const textAnimation = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const Banner = () => {
  return (
    <Swiper
      effect="fade"
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, EffectFade]}
      className="h-[65vh] sm:h-[75vh] md:h-[85vh] w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-full w-full bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/80"></div>

            {/* Text Container */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10">
              <motion.div
                key={index}
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                className="text-center backdrop-blur-md bg-white/10 border border-white/20 
                p-6 sm:p-8 md:p-12 
                rounded-2xl sm:rounded-3xl 
                shadow-2xl 
                max-w-xs sm:max-w-xl md:max-w-3xl"
              >
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-snug">
                  {slide.title}
                </h2>

                <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-6">
                  {slide.description}
                </p>

                {/* <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Link
                    to="/apartment"
                    className="btn bg-blue-600 hover:bg-blue-700 border-none text-white rounded-full px-6 sm:px-8 w-full sm:w-auto shadow-none"
                  >
                    Explore
                  </Link>

                  <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black rounded-full px-6 sm:px-8 w-full sm:w-auto">
                    Learn More
                  </button>
                </div> */}
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
