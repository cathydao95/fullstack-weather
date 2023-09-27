import React, { useEffect, useState } from "react";
import "./Favorites.css";

const Favorites = ({ userFavorites }) => {
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
                <button>Delete</button>
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
