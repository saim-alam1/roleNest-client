import Banner from "../Banner/Banner";
import Coupons from "../Coupons/Coupons";
import AboutTheBuilding from "../AboutBuilding/AboutTheBuilding";
import ApartmentLocation from "../ApartmentLocation/ApartmentLocation";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutTheBuilding />
      <Coupons />
      <ApartmentLocation />
    </div>
  );
};

export default Home;
