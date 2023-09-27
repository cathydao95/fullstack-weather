import { useState, useEffect } from "react";
import "./EditFavorites.css";

const EditFavorites = ({
  editingId,
  setUserFavorites,
  userFavorites,
  setIsEditing,
}) => {
  console.log(editingId);

  const [userInfo, setUserInfo] = useState({ name: "", favorite_city: "" });
  const [weatherData, setWeatherData] = useState();

  const handleInput = (e) => {
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const getWeatherForLocation = async (city) => {
    const response = await fetch(
      `http://localhost:8080/api/weather?city=${city}`
    );
    const weatherData = await response.json();
    console.log("WEATHERDATA", weatherData.data);
    setWeatherData(weatherData.data);
  };

  const getSingleUserFav = async () => {
    console.log("test1");
    const response = await fetch(
      `http://localhost:8080/api/v1/users/${editingId}`
    );
    console.log("test2");
    const {
      data: { user },
    } = await response.json();
    console.log(user);
    setUserInfo(user[0]);
    getWeatherForLocation(user[0].favorite_city);
  };

  useEffect(() => {
    getSingleUserFav();
  }, []);

  const updateUserFav = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/users/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON",
        },
        body: JSON.stringify(userInfo),
      }
    );
    const {
      data: { updatedUser },
    } = await response.json();

    console.log(userFavorites, "UF");
    let updatedFavs = userFavorites.map((fav) =>
      fav.id === editingId ? updatedUser[0] : fav
    );

    console.log(updatedFavs);
    setUserFavorites(updatedFavs);
    getWeatherForLocation(updatedUser[0].favorite_city);
  };

  console.log(userInfo);
  return (
    <div className="editContainer">
      <div className="searchContainer">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          autoComplete="off"
          value={userInfo.name}
          onChange={(e) => handleInput(e)}
        ></input>
        <input
          type="text"
          id="city"
          name="favorite_city"
          placeholder="Search for a city"
          autoComplete="off"
          onChange={(e) => handleInput(e)}
          value={userInfo.favorite_city}
        ></input>

        <button className="eventBtn" onClick={updateUserFav}>
          Update
        </button>
        <button className="eventBtn" onClick={() => setIsEditing(false)}>
          Back
        </button>
      </div>
      {weatherData && weatherData.name && (
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
      )}
    </div>
  );
};

export default EditFavorites;
