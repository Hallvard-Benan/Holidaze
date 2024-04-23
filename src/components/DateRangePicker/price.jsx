import React, { useState } from "react";

const pricecomponent = () => {
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    setPrice(event.target.value);

    console.log("value is:", event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    // 👇️ value of input field
    console.log("handleClick 👉️", price);
  };

  return (
    <>
      <input
        type="number"
        id="value"
        onChange={handleChange}
        value={price}
        autoComplete="off"
      />
      <button onClick={handleClick}> Click </button>
    </>
  );
};
export default pricecomponent;
