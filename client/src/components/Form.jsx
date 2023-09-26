import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Form.css";

const Form = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState();

  const getWeatherForLocation = async () => {
    const response = await fetch(
      `http://localhost:3000/api/weather?city=${city}`
    );
    const weatherData = await response.json();
    setData(weatherData.data);
  };

  return (
    <>
      <div className="form">
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter a city"
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button className="submitBtn" onClick={getWeatherForLocation}>
          Get Weather
        </button>
      </div>
      <WeatherCard city={city} data={data} />
    </>
  );
};

export default Form;
