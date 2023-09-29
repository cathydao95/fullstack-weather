import { useState, useEffect } from "react";
import "./EditFavorites.css";
import { getWeatherForLocation } from "../utils";
import WeatherInfo from "./WeatherInfo";
import InputRow from "./InputRow";

const EditFavorites = ({
  editingId,
  setUserFavorites,
  userFavorites,
  setIsEditing,
}) => {
  const [userInfo, setUserInfo] = useState({ name: "", favorite_city: "" });
  const [weatherData, setWeatherData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleInput = (e) => {
    setUserInfo((prevInfo) => {
      return { ...prevInfo, [e.target.name]: e.target.value };
    });
  };

  const updateWeatherData = async (city) => {
    let data = await getWeatherForLocation(city);
    setWeatherData(data.data);
    setIsLoading(false);
  };

  const getSingleUserFav = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${editingId}`
      );
      if (response.ok) {
        const {
          data: { user },
        } = await response.json();
        setUserInfo(user[0]);
        updateWeatherData(user[0].favorite_city);
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  useEffect(() => {
    getSingleUserFav();
  }, []);

  const updateUserFav = async () => {
    if (userInfo.name === "" || userInfo.favorite_city === "") {
      alert("Please fill out all info");
      return;
    }
    try {
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

      if (response.ok) {
        const {
          data: { updatedUser },
        } = await response.json();
        let updatedFavs = userFavorites.map((fav) =>
          fav.id === editingId ? updatedUser[0] : fav
        );
        setUserFavorites(updatedFavs);
        updateWeatherData(updatedUser[0].favorite_city);
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error occured while editing data", error);
    }
  };

  return (
    !isLoading && (
      <div className="editContainer">
        <div className="searchContainer">
          <InputRow
            nameValue={userInfo.name}
            cityValue={userInfo.favorite_city}
            onChange={(e) => handleInput(e)}
          />
          <button className="eventBtn" onClick={updateUserFav}>
            Update
          </button>
          <button className="eventBtn" onClick={() => setIsEditing(false)}>
            Back
          </button>
        </div>
        {weatherData && weatherData.name && (
          <WeatherInfo weatherData={weatherData} />
        )}
      </div>
    )
  );
};

export default EditFavorites;
