import { Link } from "react-router";
import forbiddenAccess from "../../../../assets/forbiddenAccess.json";
import Lottie from "lottie-react";

const ForbiddenAccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4 text-center">
      {/* Lottie Animation */}
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mb-6">
        <Lottie animationData={forbiddenAccess} loop={true} />
      </div>

      {/* Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">403</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Forbidden Access
      </h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
        <br />
        Please contact the administrator if you think this is a mistake.
      </p>

      {/* Button to go back */}
      <Link
        to="/dashboard"
        className="btn bg-[#2563eb] hover:bg-[#1550cf] text-white px-6 py-3 rounded-lg shadow-md"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ForbiddenAccess;
