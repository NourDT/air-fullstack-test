import dayjs from "dayjs";
import React from "react";
import { Calendar } from "./Calendar";
import { Description } from "./Description";
import { TimeslotPicker } from "./TimeslotPicker";

export class App extends React.Component {
  render() {
    return (
      <div className="flex md:flex-row flex-col max-w-3/4 mx-auto my-24 divide-x divide-solid space-4">
        {/* px-4 everywhere is a hack, but it works... */}
        <div className="px-4 flex-grow">
          <Description
            name="John Doe"
            eventTitle="Event name"
            duration={30}
            eventDescription="I don't know what I'm doing here..."
          />
        </div>
        <div className="px-4 flex-grow">
          <Calendar currDate={dayjs()} />
        </div>
        <div className="px-4 flex-grow">
          <TimeslotPicker date={new Date()} />
        </div>
      </div>
    );
  }
}
