import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { cleanWeatherData, fetchCity } from "../redux/weatherSlice";
import WeatherCard from "./WeatherCard";
import Map from "./Map";

function City() {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("Şehir Seçiniz");
  const [cityshown, setcityshown] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanWeatherData());
    const fetchCities = async () => {
      axios(`${process.env.REACT_APP_API_BASE_ENDPOINT_2}`)
        .then((response) => response.data)
        .then((res) => {
          setCities(res);
          setError("");
        })
        .catch((error) => setError(error));
    };
    fetchCities();
  }, [dispatch]);

  const handleClick = (name) => {
    if (name !== cityName) {
      setCityName(name);
      dispatch(fetchCity(name));
      setcityshown(false);
    }
  };

  return (
    <div className="city p-4">
      <div className="container">
        <div className="mb-2 d-flex justify-content-center flex-column align-items-center">
          {error && (
            <>
              <h4 style={{ color: "red" }}>{error.message}</h4>
              <h4 style={{ color: "red" }}>"Şehirler yüklenemedi."</h4>
            </>
          )}
          <button
            name="cars"
            id="cars"
            className="btn btn-outline-secondary w-50"
            onClick={() => setcityshown(!cityshown)}
          >
            {cityName}
            <span style={{ float: "right" }}>{cityshown ? "↑" : "↓"} </span>
          </button>
          {cityshown && (
            <ul className="dropdown-menu-ul">
              {cities?.map((city) => (
                <li
                  key={city.id}
                  className="dropdown-item"
                  value={city.name}
                  onClick={() => handleClick(city.name)}
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <WeatherCard />
        {/* <Map /> */}
      </div>
    </div>
  );
}

export default City;
