import { use } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../Shared/Loadings/Loading";

const MyProfile = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();

  const { data: applicantsInfo, isLoading } = useQuery({
    queryKey: ["applicants-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance(`/approved-agreement/${user?.email}`);
      return res?.data;
    },
  });

  const {
    agreementAcceptedDate,
    apartmentNo,
    blockName,
    floorNo,
    rent,
    requestedAt,
    status,
  } = applicantsInfo || {};

  if (isLoading) return <Loading />;

  return (
    <section className="my-9 px-4">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        My Profile
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8">
          {/* User Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-base-300">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-[#3c89ff] ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                />
              </div>
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-heading">
                {user?.displayName}
              </h3>
              <p className="description-text">{user?.email}</p>
              <p className="text-sm text-heading">
                Agreement Accepted:{" "}
                <span className="font-medium">
                  {agreementAcceptedDate
                    ? new Date(agreementAcceptedDate).toLocaleDateString(
                        "en-GB",
                      )
                    : "None"}
                </span>
              </p>
            </div>
          </div>

          {/* Apartment Info */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-heading mb-5">
              Rented Apartment Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Apartment No</p>
                <p className="text-heading font-semibold">
                  {apartmentNo || "None"}
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Block</p>
                <p className="text-heading font-semibold">
                  {blockName || "None"}
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Floor</p>
                <p className="text-heading font-semibold">
                  {floorNo || "None"}
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Rent</p>
                <p className="text-heading font-semibold">{rent || "None"}৳</p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Requested At</p>
                <p className="text-heading font-semibold">
                  {requestedAt
                    ? new Date(requestedAt).toLocaleDateString("en-GB")
                    : "None"}
                </p>
              </div>

              <div className="bg-base-200 rounded-xl p-4">
                <p className="description-text">Status</p>
                <p className="text-green-600 font-semibold capitalize">
                  {status || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
