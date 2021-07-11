import React from "react";
import "../styles/components/card.scss";
import MyButton from "./button";
function MyCard({
  name,
  booking,
  duration,
  description,
  showDates,
  setShowDates,
  dateSelection,
}) {
  const currentTimeZone = new Date().toString().split("(")[1].split(")")[0];
  return (
    <div
      className={`card ${
        dateSelection
          ? "date-selected-card"
          : showDates
          ? "show-selected-card"
          : ""
      }`}
    >
      <div className="heading">
        <h4 className="name">{name}</h4>
        <h2>{booking}</h2>
      </div>
      <div className="time">
        <p>{duration} minutes</p>
        <p>{currentTimeZone}</p>
      </div>
      <div className="description">
        {description
          ? description
          : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        animi minus aut consectetur itaque natus mollitia voluptatibus
        reiciendis et at aperiam sequi corrupti iure adipisci, velit facere
        laudantium quibusdam. Molestias.`}
      </div>
      {!showDates && (
        <MyButton onClick={() => setShowDates(!showDates)}>Book Now</MyButton>
      )}
    </div>
  );
}

export default MyCard;
