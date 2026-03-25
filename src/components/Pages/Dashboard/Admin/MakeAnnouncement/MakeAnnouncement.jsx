import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxios from "../../../../../Hooks/useAxios";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();

  const makeAnnouncement = useMutation({
    mutationFn: async (announcementData) => {
      const res = await axiosInstance.post(
        "/make-announcement",
        announcementData,
      );
      console.log(res);
      return res;
    },
    onSuccess: () => {
      toast.success("Announcement posted successfully");
      reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleAnnouncement = (announcementData) => {
    makeAnnouncement.mutate(announcementData);
  };

  return (
    <section className="mt-9 space-y-12 lg:mr-3">
      <h2 className="text-4xl font-bold text-heading text-center">
        Make Announcement
      </h2>

      <form onSubmit={handleSubmit(handleAnnouncement)} className="space-y-6">
        {/* Announcement Title */}
        <div className="flex flex-col space-y-1">
          <label className="label">Announcement Title</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Announcement Title"
            {...register("announcementTitle", { required: true })}
          />
          {errors.announcementTitle && (
            <span>
              <p className="text-red-500 text-[14px]">
                Announcement title field is required
              </p>
            </span>
          )}
        </div>
        {/* Announcement Description */}
        <div className="flex flex-col space-y-1">
          <label className="label">Announcement Description</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Announcement Description"
            {...register("announcementDescription", { required: true })}
          />
          {errors.announcementDescription && (
            <span>
              <p className="text-red-500 text-[14px]">
                Announcement description field is required
              </p>
            </span>
          )}
        </div>

        <button
          type="submit"
          className="text-base mt-1 btn border-none w-full shadow-none bg-[#2563eb] text-white hover:bg-[#1550cf]"
        >
          Publish
        </button>
      </form>
    </section>
  );
};

export default MakeAnnouncement;
