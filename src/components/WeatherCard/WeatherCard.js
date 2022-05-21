import React from "react";
import { useSelector } from "react-redux";
import { weatherSelector } from "../../redux/weatherSlice";
import moment from "moment";

function WeatherCard() {
  const citydata = useSelector(weatherSelector);

  return (
    <>
      {citydata.name && (
        <div id="card" className="card text-center cardblue">
          <div className="card-header">{`${
            citydata?.name.includes("Province")
              ? citydata.name.split(" ")[0]
              : citydata.name
          } , Turkey`}</div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <div>
                <img
                  className="card-img-top w-80 m-1 mt-0"
                  src={`http://openweathermap.org/img/wn/${citydata.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <h1>{Math.round(citydata.main.temp - 273) + "°C"}</h1>
                <h5 className="mb-3">{citydata.weather[0].description}</h5>
              </div>

              <ul className="cardInfo ">
                <li>
                  <span>Hissedilen Sıcaklık:</span>
                  <span>
                    {Math.round(citydata.main.feels_like - 273) + "°C"}
                  </span>
                </li>
                <li>
                  <span>Nem:</span>
                  <span>{citydata.main.humidity + "%"}</span>
                </li>
                <li>
                  <span>Basınç:</span>
                  <span>{citydata.main.pressure + "hPa"}</span>
                </li>
                <li>
                  <span>Deniz Seviyesi:</span>
                  <span>{citydata.main.sea_level + "hPa"}</span>
                </li>
                <li>
                  <span>Maksimum Sıcaklık:</span>
                  <span>{Math.round(citydata.main.temp_max - 273) + "°C"}</span>
                </li>
                <li>
                  <span>Minimum Sıcaklık:</span>
                  <span>{Math.round(citydata.main.temp_min - 273) + "°C"}</span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-between align-items-center card-footer opacity-75">
              <ul className="w-50">
                <li>
                  <span>Gün Doğumu:</span>
                  <span>
                    {moment(citydata.sys.sunrise).format("h:mm:ss a")}
                  </span>
                </li>
                <li>
                  <span>Gün Batımı:</span>
                  <span>{moment(citydata.sys.sunset).format("h:mm:ss a")}</span>
                </li>
              </ul>
              <ul className="w-50">
                <li>
                  <span>Rüzgar Hızı:</span>
                  <span>{citydata.wind.deg + "m/sn"}</span>
                </li>
                <li>
                  <span>Rüzgar Yönü:</span>
                  <span>{citydata.wind.gust}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;
