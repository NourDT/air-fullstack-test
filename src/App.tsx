import React from "react";
import { Calendar } from "./Calendar";
import { Description } from "./Description";
import { TimeslotPicker } from "./TimeslotPicker";

export class App extends React.Component {
  render() {
    return (
      <div className="grid lg:grid-cols-3 max-w-3/4 mx-auto my-24 divide-x divide-solid space-4">
        {/* px-4 everywhere is a hack, but it works... */}
        <div className="px-4">
          <Description
            name="John Doe"
            eventTitle="Event name"
            duration={30}
            eventDescription="I don't know what I'm doing here..."
          />
        </div>
        <div className="px-4">
          <Calendar />
        </div>
        <div className="px-4">
          <TimeslotPicker date={new Date()} />
        </div>
      </div>
    );
  }
}
