import dayjs from "dayjs";
import React from "react";
import { Calendar } from "./Calendar";
import { Description } from "./Description";
import { TimeslotPicker } from "./TimeslotPicker";
import { freeSlots } from "./schedule";
import { Prisma, User } from "@prisma/client";
import { RouteComponentProps } from "react-router";

type BookingProps = RouteComponentProps<{}, any, { user: User }>;

type BookingState = {
  selectedDate: dayjs.Dayjs;
  slots: dayjs.Dayjs[];
};

export class Booking extends React.Component<BookingProps, BookingState> {
  constructor(props: BookingProps) {
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
    const user = this.props.location.state.user;

    return (
      <div className="flex md:flex-row flex-col lg:min-w-full divide-x divide-solid space-4">
        {/* px-4 everywhere is a hack, but it works... */}
        <div className="px-4 md:w-1/3">
          <Description
            name={`${user.firstName} ${user.lastName}`}
            eventTitle="Event name"
            durationMinutes={30}
            eventDescription="I don't know what I'm doing here..."
          />
        </div>
        <div className="px-4 md:w-1/3">
          <Calendar
            currDate={dayjs()}
            selectedDate={this.state.selectedDate}
            handleDateSelect={(date: dayjs.Dayjs) =>
              this.handleDateSelect(date)
            }
          />
        </div>
        <div className="px-4 md:w-1/3">
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
        {
          userId: {
            equals: this.props.location.state.user.id,
          },
        },
      ],
    };

    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/events`, {
      method: "POST",
      body: JSON.stringify({
        where: whereInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })
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
