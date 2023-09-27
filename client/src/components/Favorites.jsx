import React, { useEffect, useState } from "react";
import "./Favorites.css";
import EditFavorites from "./EditFavorites";

const Favorites = ({ userFavorites, setUserFavorites }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState();

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

  const handleEditClick = (e, id) => {
    e.preventDefault();
    setIsEditing(true);
    setEditingId(id);
  };
  return (
    <div className="favorites">
      <h1 className="favoritesTitle">User Favorites</h1>
      {userFavorites && (
        <div className="cardContainer">
          {userFavorites.map((user) => {
            const { id, name, favorite_city } = user;
            return (
              <div className="favoritesCard" key={id}>
                <div className="cardInfoContainer">
                  <p>Name: {name}</p>
                  <p>Favorite City: {favorite_city}</p>
                  <div className="eventBtnContainer">
                    <button
                      className="eventBtn"
                      onClick={(e) => deleteUserFav(e, id)}
                    >
                      Delete
                    </button>
                    <button
                      className="eventBtn"
                      onClick={(e) => handleEditClick(e, id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isEditing && (
        <EditFavorites
          setIsEditing={setIsEditing}
          editingId={editingId}
          setUserFavorites={setUserFavorites}
          userFavorites={userFavorites}
        />
      )}
    </div>
  );
};

export default Favorites;
