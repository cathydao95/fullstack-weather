import React from "react";
import "./WeatherCard.css";
import WeatherInfo from "./WeatherInfo";

const WeatherCard = ({
  data,
  setShowWeatherCard,
  userInfo,
  setUserFavorites,
  setUserInfo,
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
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while adding data", error);
    }
  };
  return (
    <div className="weatherContainer">
      <div className="btnContainer">
        <button
          className="btn"
          onClick={() => {
            setShowWeatherCard(false);
            setUserInfo({});
          }}
        >
          Cancel
        </button>
        <button className="btn" onClick={(e) => addUserFav(e)}>
          Add to {userInfo.name}'s favorites{" "}
        </button>
      </div>
      {data && data.name && <WeatherInfo weatherData={data} />}
      {data && data.message && (
        <p className="noCity">No such city. Please enter a valid city</p>
      )}
    </div>
  );
};

export default WeatherCard;
