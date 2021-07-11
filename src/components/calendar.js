import React from "react";
import Calendar from "react-widgets/Calendar";
import "../styles/components/calendar.scss";
function MyCalendar({
  className,
  min,
  max,
  defaultValue,
  views,
  value,
  ...props
}) {
  return (
    <div
      className={`calendar-parent ${value ? "calendar-parent-with-date" : ""}`}
    >
      <Calendar
        className={className ? `${className} calendar` : `calendar`}
        min={min ? min : new Date()}
        defaultValue={defaultValue}
        max={max ? max : new Date("31 december 2021")}
        views={views ? views : ["month", "year"]}
        value={value}
        {...props}
      />
    </div>
  );
}

export default MyCalendar;
