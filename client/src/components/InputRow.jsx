import React from "react";
// FORM INPUT ROWS
const InputRow = ({ nameValue, cityValue, onChange }) => {
  return (
    <div>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Username"
        autoComplete="off"
        value={nameValue}
        onChange={onChange}
      ></input>
      <input
        type="text"
        id="city"
        name="favorite_city"
        placeholder="Search for a city"
        autoComplete="off"
        value={cityValue}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputRow;
