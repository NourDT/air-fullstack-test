import dayjs from "dayjs";
import React from "react";
import { Calendar } from "./Calendar";
import { Description } from "./Description";
import { TimeslotPicker } from "./TimeslotPicker";
import { freeSlots } from "./schedule";
import { Prisma } from "@prisma/client";

type AppState = {
  selectedDate: dayjs.Dayjs;
  slots: dayjs.Dayjs[];
};

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedDate: dayjs(),
      slots: [],
    };
  }

  componentDidMount() {
    this.fetchBookedSlots();
  }

  render() {
    return (
      <div className="flex md:flex-row flex-col max-w-3/4 mx-auto my-24 divide-x divide-solid space-4">
        {/* px-4 everywhere is a hack, but it works... */}
        <div className="px-4 w-1/3">
          <Description
            name="John Doe"
            eventTitle="Event name"
            durationMinutes={30}
            eventDescription="I don't know what I'm doing here..."
          />
        </div>
        <div className="px-4 w-1/3">
          <Calendar
            currDate={dayjs()}
            selectedDate={this.state.selectedDate}
            handleDateSelect={(date: dayjs.Dayjs) =>
              this.handleDateSelect(date)
            }
          />
        </div>
        <div className="px-4 w-1/3">
          <TimeslotPicker
            date={this.state.selectedDate}
            slots={this.state.slots}
          />
        </div>
      </div>
    );
  }

  handleDateSelect(date: dayjs.Dayjs) {
    this.setState({ selectedDate: date });
    this.fetchBookedSlots();
  }

  fetchBookedSlots() {
    const whereInput: Prisma.EventWhereInput = {
      AND: [
        {
          startTime: {
            lte: new Date(this.state.selectedDate.startOf("day").valueOf()),
          },
        },
        {
          endTime: {
            lte: new Date(this.state.selectedDate.endOf("day").valueOf()),
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
      .then((parsed) =>
        this.setState((state) => ({
          slots: freeSlots(
            parsed,
            state.selectedDate.hour(8).minute(0),
            state.selectedDate.hour(16).minute(0),
            30
          ),
        }))
      )
      .catch((e) => console.error(e));
  }
}
