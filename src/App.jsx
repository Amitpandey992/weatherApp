import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Forecast from "./components/Forecast";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState("metric");
  const [searchClicked, setSearchClicked] = useState(false);

  const onSearch = async () => {
    try {
      if (city === "") {
        toast.error("Hey, You Forgot to Enter City Name");
        return;
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=${tempUnit}`
      );
      if (response.data) {
        setWeatherData(response.data);
        // console.log(response.data);
        setSearchClicked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (error?.response?.data?.message === "city not found") {
        return toast.error("City not found 👀🔎");
      }
      toast.error("Failed to fetch weather data. Please try again later.");
    }
  };

  useEffect(() => {
    if (city !== "") {
      onSearch();
    }
  }, [tempUnit]);

  const onTempUnitChange = () => {
    setTempUnit((prevTempUnit) =>
      prevTempUnit === "metric" ? "imperial" : "metric"
    );
    setSearchClicked((prev) => !prev);
  };
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center pt-7">
      <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-md overflow-hidden p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
          Weather App
        </h1>
        <div className="flex flex-col lg:flex-row mb-4">
          <input
            type="text"
            className="w-full lg:w-auto border border-gray-300 rounded-md py-2 px-4 mb-2 lg:mb-0 lg:mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter City Name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: "100%", maxWidth: "50rem" }}
          />
          <button
            className="w-full lg:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800"
            onClick={onSearch}
          >
            Search City
          </button>
        </div>
        {weatherData && (
          <div className="mb-4">
            <div className="border-b border-gray-300 pb-4">
              <h1 className="text-3xl font-semibold mb-2 pt-2">
                City: {weatherData.name}
              </h1>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold mr-4">Current Weather:</h2>
                <h1 className="text-4xl font-bold text-gray-800 mr-4">
                  {weatherData.main.temp}&deg;{" "}
                  {tempUnit === "metric" ? "C" : "F"}
                </h1>
                <button
                  className="text-indigo-500 font-semibold focus:outline-none"
                  onClick={onTempUnitChange}
                >
                  {tempUnit === "metric" ? "Convert to °F" : "Convert to °C"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-5">
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
                  Humidity:{" "}
                  <span className="font-bold">
                    {weatherData.main.humidity}%
                  </span>
                </p>
                <p className="text-gray-700">
                  Wind Speed:{" "}
                  <span className="font-bold">
                    {weatherData.wind.speed} km/h
                  </span>
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
        )}
      </div>
      <Forecast tempUnit={tempUnit} city={city} searchClicked={searchClicked} />
    </div>
  );
}

export default App;
