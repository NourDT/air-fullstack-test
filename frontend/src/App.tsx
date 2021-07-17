import dayjs from "dayjs";
import React from "react";
import { Calendar } from "./Calendar";
import { Description } from "./Description";
import { TimeslotPicker } from "./TimeslotPicker";

type AppState = {
  selectedDate: dayjs.Dayjs;
};

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: dayjs(),
    };
  }

  render() {
    return (
      <div className="flex md:flex-row flex-col max-w-3/4 mx-auto my-24 divide-x divide-solid space-4">
        {/* px-4 everywhere is a hack, but it works... */}
        <div className="px-4 flex-grow">
          <Description
            name="John Doe"
            eventTitle="Event name"
            durationMinutes={30}
            eventDescription="I don't know what I'm doing here..."
          />
        </div>
        <div className="px-4 flex-grow">
          <Calendar currDate={this.state.selectedDate} />
        </div>
        <div className="px-4 flex-grow">
          <TimeslotPicker date={this.state.selectedDate} />
        </div>
      </div>
    );
  }
}
