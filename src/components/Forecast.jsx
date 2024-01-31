import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Forecast({ city, tempUnit, searchClicked }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (searchClicked) {
      const fetchForecastData = async () => {
        try {
          if (city === "") {
            return;
          }

          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
              import.meta.env.VITE_API_KEY
            }&units=${tempUnit}`
          );

          if (response.data && response.data.list) {
            const filteredForecast = filterForecastData(response.data.list);
            setForecastData(filteredForecast);
          }
        } catch (error) {
          console.error("Error fetching forecast data:", error);
          toast.error("Failed to fetch forecast data. Please try again later.");
        }
      };

      fetchForecastData();
    }
  }, [searchClicked]);

  const filterForecastData = (data) => {
    const currentDate = new Date();
    const nextFiveDays = {};

    for (let i = 0; i < data.length; i++) {
      const forecastDate = new Date(data[i].dt_txt);
      const forecastDay = forecastDate.getDate(); // Extract day part only
      const forecastMonth = forecastDate.getMonth(); // Extract month part only

      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();

      // Exclude data from the same day
      if (
        forecastDate.getTime() > currentDate.getTime() &&
        (forecastDay !== currentDay || forecastMonth !== currentMonth)
      ) {
        const key = forecastDate.toDateString();
        if (!nextFiveDays[key]) {
          nextFiveDays[key] = data[i];
        }
      }

      if (Object.keys(nextFiveDays).length === 5) {
        break;
      }
    }
    // console.log(Object.values(nextFiveDays));
    return Object.values(nextFiveDays);
  };

  return (
    <div className="flex items-center justify-center w-full bg-gray-200 overflow-hidden">
      <div className="max-w-screen-xl w-full flex flex-wrap justify-center">
        {forecastData.map((weatherData, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
              <h4 className="font-semibold text-lg mb-3">
                {new Date(weatherData.dt_txt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h4>

              <h2 className="text-lg font-semibold mb-2">Weather</h2>
              <div className="flex items-center mb-4">
                <h1 className="text-4xl font-bold text-gray-800 mr-4">
                  {weatherData.main.temp}&deg;{" "}
                  {tempUnit === "metric" ? "C" : "F"}
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <p className="text-gray-700">
                    Maximum Temperature:{" "}
                    <span className="font-bold">
                      {weatherData.main.temp_max}&deg;{" "}
                      {tempUnit === "metric" ? "C" : "F"}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Minimum Temperature:{" "}
                    <span className="font-bold">
                      {weatherData.main.temp_min}&deg;{" "}
                      {tempUnit === "metric" ? "C" : "F"}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Humidity: <span className="font-bold">{weatherData.main.humidity}%</span>
                  </p>
                  <p className="text-gray-700">
                    Wind Speed: <span className="font-bold">{weatherData.wind.speed} km/h</span>
                  </p>
                </div>
                <div>
                  {weatherData.weather.map((detail, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={
                          detail.main === "Clouds"
                            ? "images/clouds.png"
                            : detail.main === "Clear"
                            ? "images/clear.png"
                            : detail.main === "Drizzle"
                            ? "images/drizzle.png"
                            : detail.main === "Humidity"
                            ? "images/humidity.png"
                            : detail.main === "Mist"
                            ? "images/mist.png"
                            : detail.main === "Rain"
                            ? "images/rain.png"
                            : detail.main === "Snow"
                            ? "images/snow.png"
                            : detail.main === "Haze"
                            ? "images/haze.png"
                            : ""
                        }
                        alt="icon"
                        className="h-16 w-16 mr-2"
                      />
                      <p className="text-gray-600">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
