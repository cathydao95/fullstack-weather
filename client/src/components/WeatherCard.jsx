import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({
  data,
  setShowWeatherCard,
  userInfo,
  setUserFavorites,
}) => {
  const addUserFav = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: {
          "Content-type": "application/JSON",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        let {
          data: { newUser },
        } = await response.json();
        setUserFavorites((prevFavs) => [...prevFavs, newUser[0]]);
        setShowWeatherCard(false);
      }
    } catch (error) {}
  };
  return (
    <div className="weatherContainer">
      <div className="btnContainer">
        <button className="btn" onClick={() => setShowWeatherCard(false)}>
          Cancel
        </button>
        <button className="btn" onClick={(e) => addUserFav(e)}>
          Add to {userInfo.name}'s favorites{" "}
        </button>
      </div>
      {data && data.name && (
        <div className="cityWeatherInfo">
          <h2 className="cityName info">{data.name}</h2>
          <p className="temperature info">{data.main.temp}°</p>
          <p className="weather info">{data.weather[0].description}</p>
          <div className="tempContainer">
            <p className="info">H: {data.main.temp_max}°</p>
            <p className="info">L: {data.main.temp_min}°</p>
          </div>
          <img
            className="icon"
            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          />
        </div>
      )}
      {data && data.message && (
        <p className="noCity">No such city. Please enter a valid city</p>
      )}
    </div>
  );
};

export default WeatherCard;
