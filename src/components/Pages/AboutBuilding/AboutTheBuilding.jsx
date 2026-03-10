import {
  FaBuilding,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";

const AboutTheBuilding = () => {
  return (
    <section className="bg-white my-20">
      <div className="max-w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-heading mb-4">
            About Our Building
          </h2>
          <p className="description-text max-w-[90%] mx-auto text-lg leading-relaxed">
            Our modern residential building is designed to provide comfort,
            security, and a premium living experience. Strategically located, it
            ensures convenience while maintaining a peaceful environment for
            residents.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#F9FAFB]">
            <FaBuilding className="text-3xl color-primary mb-4" />
            <h4 className="text-xl font-semibold text-heading mb-2">
              Modern Infrastructure
            </h4>
            <p className="description-text">
              Well-planned apartments with proper ventilation, lighting, and
              quality construction.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#F9FAFB]">
            <FaShieldAlt className="text-3xl color-primary mb-4" />
            <h4 className="text-xl font-semibold text-heading mb-2">
              24/7 Security
            </h4>
            <p className="description-text">
              CCTV monitoring and secure access systems ensuring resident
              safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#F9FAFB]">
            <FaMapMarkedAlt className="text-3xl color-primary mb-4" />
            <h4 className="text-xl font-semibold text-heading mb-2">
              Prime Location
            </h4>
            <p className="description-text">
              Located near schools, hospitals, markets, and public transport.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 bg-[#F9FAFB]">
            <FaUsers className="text-3xl color-primary mb-4" />
            <h4 className="text-xl font-semibold text-heading mb-2">
              Community Living
            </h4>
            <p className="description-text">
              A friendly and well-managed community promoting peaceful living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheBuilding;
