import WeatherCard from "../../components/WeatherCard/WeatherCard";
import CitySelector from "../../components/CitySelector/CitySelector";

function City() {
  return (
    <div className="city p-4">
      <div className="container">
        <CitySelector />
        <WeatherCard />
      </div>
    </div>
  );
}

export default City;
