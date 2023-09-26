import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ data, city }) => {
  return (
    <div>
      {data && data.name && (
        <div className="cityWeatherInfo">
          <h2 className="cityName info">
            <span>City:</span> {data.name}
          </h2>
          <p className="weather info">
            <span className="infoHeading">Description:</span>{" "}
            {data.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          />
          <p className="temperature info">
            <span className="infoHeading">Temperature:</span> {data.main.temp}
          </p>
          <p className="feelsLike info">
            <span className="infoHeading">Feels Like: </span>
            {data.main.feels_like}
          </p>
        </div>
      )}
      {data && data.message && (
        <p className="noCity">No such city. Please enter a valid city</p>
      )}
    </div>
  );
};

export default WeatherCard;
