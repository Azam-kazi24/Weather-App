import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import Clear_icon from "../assets/Clear.png";
import Cloudy_icon from "../assets/cloudy.png";
import Humidity_icon from "../assets/humidity.png";
import Rainfall_icon from "../assets/Rainfall.png";
import Drizzle_icon from "../assets/drizzle.png";
import Snowfall_icon from "../assets/snowfall.png";
import Wind_icon from "../assets/wind.png";
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    o1d: Clear_icon,
    "01n": Clear_icon,
    "02d": Cloudy_icon,
    "02n": Cloudy_icon,
    "03d": Cloudy_icon,
    "03n": Cloudy_icon,
    "04d": Drizzle_icon,
    "04n": Drizzle_icon,
    "09d": Rainfall_icon,
    "09n": Rainfall_icon,
    "10d": Rainfall_icon,
    "10n": Rainfall_icon,
    "13d": Snowfall_icon,
    "13n": Snowfall_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert(data.message);
      }
      const icon = allIcons[data.weather[0].icon] || Clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };
  useEffect(() => {
    search("London");
  }, []);
  console.log(weatherData.humidity);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          height={24}
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={Humidity_icon} alt="" />
              <div>
                <p>Humidity</p>
                <span>{weatherData.humidity}%</span>
              </div>
            </div>
            <div className="col">
              <img src={Wind_icon} alt="" />
              <div>
                <p>Wind Speed</p>
                <span>{weatherData.windSpeed} Km/h</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
