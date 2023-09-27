import React from "react";

const WeatherInfo = ({ weatherData }) => {
  return (
    <div className="cityWeatherInfo">
      <h2 className="cityName info">{weatherData.name}</h2>
      <p className="temperature info">{weatherData.main.temp}°</p>
      <p className="weather info">{weatherData.weather[0].description}</p>
      <div className="tempContainer">
        <p className="info">H: {weatherData.main.temp_max}°</p>
        <p className="info">L: {weatherData.main.temp_min}°</p>
      </div>
      <img
        className="icon"
        src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
      />
    </div>
  );
};

export default WeatherInfo;
