import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
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
      "Consists of sensors (for data acquisition), controllers (DDC/PLC), and software interfaces.",
  },
  {
    image: building2,
    title: "Centralized Control",
    description:
      "A single interface allows facility managers to monitor and adjust systems in real-time.",
  },
  {
    image: building3,
    title: "Energy Optimization",
    description:
      "Automated scheduling, occupancy sensors, and demand-based control significantly reduce energy consumption.",
  },
  {
    image: building4,
    title: "Maintenance Efficiency",
    description:
      "Identifies faults, logs data, and provides alerts, allowing for proactive, rather than reactive, maintenance.",
  },
  {
    image: building5,
    title: "Safety & Security Integration",
    description:
      "Incorporates fire alarms, smoke detectors, access control, and CCTV. Modern offer scalable solutions for everything from small offices to complex, high-rise",
  },
];

export default function App() {
  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      pagination={{ clickable: true }}
      modules={[Mousewheel, Pagination]}
      className="h-150 w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-full w-full bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-black/80"></div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-white max-w-3xl">
                {slide.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
