import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Favorites from "./components/Favorites";

const App = () => {
  const [userFavorites, setUserFavorites] = useState();
  const getUserFavorites = async () => {
    const response = await fetch("http://localhost:8080/api/v1/users");
    const {
      data: { users },
    } = await response.json();
    setUserFavorites(users);
  };
  useEffect(() => {
    getUserFavorites();
  }, []);
  return (
    <div>
      <h1 className="title">Weather App</h1>
      <Form userFavorite={userFavorites} setUserFavorites={setUserFavorites} />
      <Favorites
        userFavorites={userFavorites}
        setUserFavorites={setUserFavorites}
      />
    </div>
  );
};

export default App;
