import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./Form.css";
import { getWeatherForLocation } from "../utils";
import InputRow from "./InputRow";

const Form = ({ setUserFavorites }) => {
  const [userInfo, setUserInfo] = useState({});
  const [weatherData, setWeatherData] = useState();
  const [showWeatherCard, setShowWeatherCard] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleInput = (e) => {
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const populateData = async (city) => {
    setErrors(null);
    if (!userInfo.name && !userInfo.favorite_city) {
      setErrors("Please enter a valid user name and city");
      return;
    }

    if (!userInfo.name) {
      setErrors("Please enter user's name");
      return;
    }
    if (!userInfo.favorite_city) {
      setErrors("Please enter user's favorite city");
      return;
    }

    let weatherData = await getWeatherForLocation(city);
    setWeatherData(weatherData.data);
    setShowWeatherCard(true);
  };

  return showWeatherCard ? (
    <WeatherCard
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      showWeatherCard={showWeatherCard}
      data={weatherData}
      setShowWeatherCard={setShowWeatherCard}
      setUserFavorites={setUserFavorites}
    />
  ) : (
    <div>
      {errors && <p className="errors">{errors}</p>}
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
