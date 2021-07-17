import { Prisma } from "@prisma/client";
import React from "react";
import dayjs from "dayjs";
import { freeSlots, BookingSlot } from "./schedule";

type TimeslotPickerProps = {
  date: dayjs.Dayjs;
};

type TimeslotPickerState = {
  slots: BookingSlot[];
};

export class TimeslotPicker extends React.Component<
  TimeslotPickerProps,
  TimeslotPickerState
> {
  constructor(props: TimeslotPickerProps) {
    super(props);
    this.state = {
      slots: [],
    };
  }
  componentDidMount() {
    const whereInput: Prisma.EventWhereInput = {
      AND: [
        {
          startTime: {
            lte: new Date(this.props.date.startOf("day").valueOf()),
          },
        },
        {
          endTime: {
            lte: new Date(this.props.date.endOf("day").valueOf()),
          },
        },
      ],
    };

    fetch(
      `https://z89htl1u4d.execute-api.ap-southeast-1.amazonaws.com/dev/events`,
      {
        method: "POST",
        body: JSON.stringify({
          where: whereInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((parsed) => this.setState({ slots: parsed }))
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <div>
        <h2 className="text-lg">
          {this.props.date.format("dddd D MMMM YYYY")}
        </h2>
        <div className="h-96 overflow-y-auto">
          {freeSlots(
            this.state.slots,
            this.props.date.hour(8).minute(0),
            this.props.date.hour(16).minute(0),
            30
          ).map((value) => (
            <button
              key={value.valueOf()}
              className="block border min-w-full p-4 mt-4 rounded-lg hover:bg-blue-400 hover:text-gray-100"
            >
              {value.format("hh:mma")}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
