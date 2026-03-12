import Lottie from "lottie-react";
import animationData from "../../../../assets/error.json";
import { Link } from "react-router";

const ErrorComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 400, height: 400 }}
      />
      <Link
        to={"/"}
        className="btn bg-[#c7dbfa] font-bold text-2xl text-[#0055ea] py-7 px-7"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default ErrorComponent;
