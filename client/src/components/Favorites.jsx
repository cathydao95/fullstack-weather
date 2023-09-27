import React, { useEffect, useState } from "react";
import "./Favorites.css";

const Favorites = ({ userFavorites, setUserFavorites }) => {
  const deleteUserFav = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/JSON",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserFavorites((prevFavs) =>
          prevFavs.filter((user) => {
            return user.id !== id;
          })
        );
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1>Favorites</h1>
      {userFavorites && (
        <div>
          {userFavorites.map((user) => {
            const { id, name, favorite_city } = user;
            return (
              <div className="favoritesCard" key={id}>
                <p>Name: {name}</p>
                <p>Favorite City: {favorite_city}</p>
                <button onClick={(e) => deleteUserFav(e, id)}>Delete</button>
                <button>Edit</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
