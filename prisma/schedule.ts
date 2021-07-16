type BookingSlot = {
  startTime: Date;
  endTime: Date;
};

/**
 * Get free timeslots.
 * @param bookings Sorted array of bookings
 * @param start Start time.
 * @param end End time.
 * @param durationMinutes Event duration.
 * @returns A list of timeslots.
 */
export const freeSlots = (
  bookings: BookingSlot[],
  start: Date,
  end: Date,
  durationMinutes: number
) => {
  const overlaps = (first: BookingSlot) => (second: BookingSlot) =>
    !(first.endTime <= second.startTime || first.startTime >= second.endTime);
  const not =
    <T>(f: (x: T) => boolean) =>
    (x: T) =>
      !f(x);
  return generateSlots(start, end, durationMinutes).filter((slot) =>
    bookings.every(not(overlaps(slot)))
  );
};

/**
 * Generate a list of booking slots at regular intervals.
 * @param start Start time.
 * @param end End time.
 * @param durationMinutes Event duration.
 * @returns A list of timeslots.
 */
const generateSlots = (start: Date, end: Date, durationMinutes: number) => {
  const durationMilli = durationMinutes * 6e4;
  return Array((end.getTime() - start.getTime()) / durationMilli)
    .fill(null)
    .map((_, index) => ({
      startTime: new Date(start.getTime() + index * durationMilli),
      endTime: new Date(start.getTime() + (index + 1) * durationMilli),
    }));
};
