import React from "react";
import MyButton from "./button";
import "../styles/components/slots.scss";
import MyLoader from "./loader";

function Slots({ slots, handleClick, date, loading, ...rest }) {
  if (date && loading)
    return (
      <div className="slot-parent">
        <div className="slot-loader">
          <MyLoader />
        </div>
      </div>
    );
  return (
    <div className={`slot-parent ${slots.length ? "" : "no-slots-parent"}`}>
      <h2>{date.toDateString()}</h2>
      {slots.length ? (
        <div className="slots-section">
          {slots.map((slot, index) => {
            return (
              <div key={`slot No# ${index}`}>
                <MyButton
                  className="slot-btn"
                  onClick={() => handleClick(slot)}
                  {...rest}
                >
                  {slot}
                </MyButton>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-slots">
          <h3>No Slots Available</h3>
        </div>
      )}
    </div>
  );
}

export default Slots;
