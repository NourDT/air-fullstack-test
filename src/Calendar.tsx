import React from "react";

/**
 * Date picker component.
 *
 * The month is zero-indexed. E.g. January is 0, February is 1 and so on.
 */
const DatePicker = ({ month, year }: { month: number; year: number }) => {
  // 0 (Sun) - 6 (Sat)
  const startDay = new Date(year, month, 1).getDay();
  // Setting day argument to 0 get the date from 1 day before
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Pad the front of the array to get first day in the correct column
  const days = Array.prototype.concat(
    Array(startDay).fill(null),
    Array(daysInMonth)
      .fill(0)
      .map((_, index) => index + 1)
  );

  return (
    <div className="grid grid-cols-7 gap-4">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((value) => (
        <p key={`day-${value}`}>{value}</p>
      ))}
      {days.map((elem, index) => {
        if (elem) {
          return (
            <button
              key={`item-${index}`}
              className="border w-6 h-6 rounded-full flex items-center justify-center p-4"
            >
              {elem}
            </button>
          );
        } else {
          return <span key={`item-${index}`}></span>;
        }
      })}
    </div>
  );
};

export class Calendar extends React.Component<
  {},
  {
    month: number;
    year: number;
    min: string;
  }
> {
  constructor(props: {}) {
    super(props);

    const currDate = new Date();
    this.state = {
      month: currDate.getUTCMonth(),
      year: currDate.getUTCFullYear(),
      min: `${currDate.getUTCFullYear()}-${String(
        currDate.getMonth() + 1
      ).padStart(2, "0")}`,
    };
  }

  render() {
    return (
      <>
        <div>
          <input
            type="month"
            value={`${this.state.year}-${String(this.state.month + 1).padStart(
              2,
              "0"
            )}`}
            min={this.state.min}
            onChange={(event) => this.handleChange(event)}
          />
          {/* Left arrow */}
          <button onClick={() => this.handleClick(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Right arrow */}
          <button onClick={() => this.handleClick(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <DatePicker month={this.state.month} year={this.state.year} />
      </>
    );
  }

  handleClick(advance: boolean) {
    this.setState((state, _) => {
      let newMonth = state.month + (advance ? 1 : -1);
      let newYear = state.year;

      // FIXME Pretty ugly, but it works
      if (newMonth === 12) {
        // Advancing a year
        newMonth -= 12;
        newYear++;
      } else if (newMonth < 0) {
        // Reversing a year
        newMonth = 11;
        newYear--;
      }

      return {
        month: newMonth,
        year: newYear,
      };
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = new Date(event.target.value);
    this.setState({
      month: value.getUTCMonth(),
      year: value.getUTCFullYear(),
    });
  }
}
