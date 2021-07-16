import dayjs from "dayjs";
import React from "react";

type DatePickerProp = {
  /**
   * Month to render.
   *
   * ```
   * dayjs().month(6).startOf("month")
   * ```
   */
  renderDate: dayjs.Dayjs;

  /**
   * Current date. Used to render disabled state.
   *
   * ```
   * dayjs()
   * ```
   */
  currDate: dayjs.Dayjs;
};

/**
 * Date picker.
 *
 * ```
 * <DatePicker renderDate={dayjs().month(6).startOf("month")} currDate={dayjs()} />
 * ```
 */
const DatePicker = ({ renderDate, currDate }: DatePickerProp) => (
  <div className="grid grid-cols-7 gap-4 mx-auto place-items-center">
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((value) => (
      <p key={`day-${value}`} className="uppercase font-medium pt-4">
        {value}
      </p>
    ))}

    {Array(renderDate.day())
      .fill(null)
      .map((_, index) => (
        <span key={`blank-${index}`} />
      ))}

    {Array(renderDate.daysInMonth())
      .fill(null)
      .map((_, index) => renderDate.date(index + 1))
      .map((elem) => {
        const disabled = elem <= currDate;
        return (
          <button
            key={elem.toString()}
            className={`w-6 h-6 rounded-full flex items-center justify-center p-4 ${
              disabled ? "" : "border-2 hover:bg-blue-400 hover:text-gray-100"
            }`}
            disabled={disabled}
          >
            {elem.date()}
          </button>
        );
      })}
  </div>
);

type CalendarProps = {
  /**
   * Current date.
   */
  currDate: dayjs.Dayjs;
};

type CalendarState = {
  /**
   * Selected date.
   */
  selectedDate: dayjs.Dayjs;
};

/**
 * Calendar component.
 *
 * ```
 * <Calendar currDate={dayjs()} />
 * ```
 */
export class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      selectedDate: props.currDate.startOf("month"),
    };
  }

  render() {
    return (
      <div>
        <div className="flex flex-row">
          <input
            type="month"
            value={this.state.selectedDate.format("YYYY-MM")}
            min={this.props.currDate.format("YYYY-MM")}
            onChange={(e) => this.handleMonthChange(e)}
          />
          <span className="flex-grow" />
          {/* Left arrow */}
          <button
            onClick={() => this.handleButton(false)}
            hidden={this.state.selectedDate.isSame(
              this.props.currDate.startOf("month")
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 disabled:opacity-25"
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
          <button onClick={() => this.handleButton(true)}>
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
        <DatePicker
          renderDate={this.state.selectedDate}
          currDate={this.props.currDate}
        />
      </div>
    );
  }

  handleMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newDate = dayjs(event.target.value, "YYYY-MM");
    this.setState({ selectedDate: newDate });
  }

  handleButton(advance: boolean) {
    this.setState((state, props) => {
      const currDate = props.currDate;
      const newDate = advance
        ? state.selectedDate.add(1, "month")
        : state.selectedDate.subtract(1, "month");
      return {
        selectedDate: newDate.isBefore(currDate.startOf("month"))
          ? currDate.startOf("month")
          : newDate,
      };
    });
  }
}
