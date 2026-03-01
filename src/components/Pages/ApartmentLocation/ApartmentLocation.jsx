import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon issue in Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ApartmentLocation = () => {
  const apartmentPosition = [23.7929, 90.4165];

  return (
    <section className="w-full bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Our Apartment Location</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our beautiful apartment! Here’s where you’ll find us and
            how to get here easily.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>
              📍 Address: House 15, Road 11, Banani Model Town, Dhaka 1213,
              Bangladesh
            </li>
            <li>🚌 Public Transport: Accessible via Bus #5, #12</li>
            <li>🚗 Parking: Free parking available on-site</li>
            <li>
              🕒 Nearby Amenities: Grocery, pharmacy, restaurants within walking
              distance
            </li>
          </ul>
          <p className="mt-4 text-gray-500 italic">
            Use the map below to get directions or explore the neighborhood.
          </p>
        </div>

        {/* Map Section */}
        <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={apartmentPosition}
            zoom={16}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={apartmentPosition}>
              <Popup>Our Apartment 🏠</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLocation;
