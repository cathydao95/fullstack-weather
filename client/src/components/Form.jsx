import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Form.css";
import { getWeatherForLocation } from "../utils";
import InputRow from "./InputRow";

const Form = ({ setUserFavorites }) => {
  const [userInfo, setUserInfo] = useState({});
  const [weatherData, setWeatherData] = useState();
  const [showWeatherCard, setShowWeatherCard] = useState(false);

  const handleInput = (e) => {
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const populateData = async (city) => {
    let weatherData = await getWeatherForLocation(city);
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
        <InputRow onChange={(e) => handleInput(e)} />
        <button
          className="searchBtn"
          onClick={() => populateData(userInfo.favorite_city)}
        >
          Get Weather
        </button>
      </div>
    </div>
  );
};

export default Form;
