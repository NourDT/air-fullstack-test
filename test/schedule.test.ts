import { freeSlots } from "../prisma/schedule";

describe("Schedule module", () => {
  it("should return an empty array for no free slots", () => {
    const bookings = [
      { startTime: new Date(2021, 1, 1, 8), endTime: new Date(2021, 1, 1, 9) },
      { startTime: new Date(2021, 1, 1, 9), endTime: new Date(2021, 1, 1, 10) },
    ];
    const start = new Date(2021, 1, 1, 8);
    const end = new Date(2021, 1, 1, 10);
    const minutes = 10;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([]);
  });

  it("should return all available slots if given no bookings", () => {
    const bookings = [];
    const start = new Date(2021, 1, 1, 8);
    const end = new Date(2021, 1, 1, 10);
    const minutes = 60;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      { startTime: new Date(2021, 1, 1, 8), endTime: new Date(2021, 1, 1, 9) },
      { startTime: new Date(2021, 1, 1, 9), endTime: new Date(2021, 1, 1, 10) },
    ]);
  });

  it("should not overlap slots with any bookings", () => {
    const bookings = [
      { startTime: new Date(2021, 1, 1, 8), endTime: new Date(2021, 1, 1, 9) },
    ];
    const start = new Date(2021, 1, 1, 8);
    const end = new Date(2021, 1, 1, 10);
    const minutes = 30;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      {
        startTime: new Date(2021, 1, 1, 9),
        endTime: new Date(2021, 1, 1, 9, 30),
      },
      {
        startTime: new Date(2021, 1, 1, 9, 30),
        endTime: new Date(2021, 1, 1, 10),
      },
    ]);
  });

  it("should return all available slots if given bookings earlier than start time", () => {
    const bookings = [
      { startTime: new Date(2021, 1, 1, 0), endTime: new Date(2021, 1, 1, 1) },
    ];
    const start = new Date(2021, 1, 1, 8);
    const end = new Date(2021, 1, 1, 10);
    const minutes = 60;
    expect(freeSlots(bookings, start, end, minutes)).toEqual([
      { startTime: new Date(2021, 1, 1, 8), endTime: new Date(2021, 1, 1, 9) },
      { startTime: new Date(2021, 1, 1, 9), endTime: new Date(2021, 1, 1, 10) },
    ]);
  });
});
