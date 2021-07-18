import dayjs from "dayjs";
import { freeSlots } from "../src/schedule";

describe("Schedule module", () => {
  it("should return an empty array for no free slots", () => {
    const bookings = [
      {
        startTime: dayjs("2021-01-01").hour(8),
        endTime: dayjs("2021-01-01").hour(9),
      },
      {
        startTime: dayjs("2021-01-01").hour(9),
        endTime: dayjs("2021-01-01").hour(10),
      },
    ];
    const start = dayjs("2021-01-01").hour(8);
    const end = dayjs("2021-01-01").hour(10);
    const minutes = 60;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([]);
  });

  it("should return all available slots if given no bookings", () => {
    const bookings = [];
    const start = dayjs("2021-01-01").hour(8);
    const end = dayjs("2021-01-01").hour(10);
    const minutes = 60;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      dayjs("2021-01-01").hour(8),
      dayjs("2021-01-01").hour(9),
    ]);
  });

  it("should not overlap slots with any bookings", () => {
    const bookings = [
      {
        startTime: dayjs("2021-01-01").hour(8),
        endTime: dayjs("2021-01-01").hour(9),
      },
    ];
    const start = dayjs("2021-01-01").hour(8);
    const end = dayjs("2021-01-01").hour(10);
    const minutes = 30;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      dayjs("2021-01-01").hour(9),
      dayjs("2021-01-01").hour(9).minute(30),
    ]);
  });

  it("should return all available slots if given bookings earlier than start time", () => {
    const bookings = [
      {
        startTime: dayjs("2021-01-01").hour(0),
        endTime: dayjs("2021-01-01").hour(1),
      },
    ];
    const start = dayjs("2021-01-01").hour(8);
    const end = dayjs("2021-01-01").hour(10);
    const minutes = 60;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      dayjs("2021-01-01").hour(8),
      dayjs("2021-01-01").hour(9),
    ]);
  });
});
