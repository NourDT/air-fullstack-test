import React from "react";

export class TimeslotPicker extends React.Component<{ date: Date }, {}> {
  render() {
    return (
      <div>
        <h2>{this.props.date.toLocaleString()}</h2>
        <div>
          {["12:10am", "12:20am", "4:00pm", "4:10pm"].map((value, index) => (
            <button
              key={`slot-${index}`}
              className="block border justify-center p-8 mx-auto mt-4 min-w-3/4 rounded-lg"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
