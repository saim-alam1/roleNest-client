import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loadings/Loading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["load-announcements"],
    queryFn: async () => {
      const res = await axiosSecure("/announcements");
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="mt-9">
      <h2 className="text-4xl font-bold text-heading text-center mb-10">
        Admin Announcements
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="card bg-base-100 shadow-sm hover:shadow-md"
          >
            <div className="card-body">
              <h2 className="card-title">{announcement.announcementTitle}</h2>
              <hr className="w-11/12 border-gray-500" />
              <p className="text-[#374151]">
                {announcement.announcementDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements;
