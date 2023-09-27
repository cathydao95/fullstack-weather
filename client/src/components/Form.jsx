import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Form.css";

const Form = ({ setUserFavorites }) => {
  const [userInfo, setUserInfo] = useState({});
  const [weatherData, setWeatherData] = useState();
  const [showWeatherCard, setShowWeatherCard] = useState(false);

  const handleInput = (e) => {
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {};

  const getWeatherForLocation = async () => {
    const response = await fetch(
      `http://localhost:8080/api/weather?city=${userInfo.city}`
    );
    const weatherData = await response.json();
    setWeatherData(weatherData.data);
    setShowWeatherCard(true);
  };

  return showWeatherCard ? (
    <WeatherCard
      userInfo={userInfo}
      showWeatherCard={showWeatherCard}
      data={weatherData}
      setShowWeatherCard={setShowWeatherCard}
      setUserFavorites={setUserFavorites}
    />
  ) : (
    <div>
      <div className="searchContainer">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          autoComplete="off"
          onChange={(e) => handleInput(e)}
        ></input>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Search for a city"
          autoComplete="off"
          onChange={(e) => handleInput(e)}
        ></input>

        <button className="searchBtn" onClick={getWeatherForLocation}>
          Get Weather
        </button>
      </div>
    </div>
  );
};

export default Form;
