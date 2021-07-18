import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export type BookingSlot = {
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
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
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  durationMinutes: number
) =>
  generateSlots(start, end, durationMinutes)
    .filter((slot) => bookings.every(not(overlaps(slot))))
    .map((booking) => booking.startTime);

/**
 * Return true if the two booking slots overlap.
 * @param first First booking slot.
 * @param second Second booking slot.
 * @returns A boolean.
 */
const overlaps = (first: BookingSlot) => (second: BookingSlot) =>
  !(
    first.endTime.isSameOrBefore(second.startTime) ||
    first.startTime.isSameOrAfter(second.endTime)
  );

/**
 * Negate a unary predicate function.
 * @param f A unary predicate function.
 * @param x An item.
 * @returns A boolean.
 */
const not =
  <T>(f: (x: T) => boolean) =>
  (x: T) =>
    !f(x);

/**
 * Generate a list of booking slots at regular intervals.
 * @param start Start time.
 * @param end End time.
 * @param durationMinutes Event duration.
 * @returns A list of timeslots.
 */
const generateSlots = (
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
  durationMinutes: number
) => {
  const durationMilli = durationMinutes * 6e4;
  return Array((end.valueOf() - start.valueOf()) / durationMilli)
    .fill(null)
    .map((_, index) => ({
      startTime: dayjs(start).add(index * durationMilli, "millisecond"),
      endTime: dayjs(start).add((index + 1) * durationMilli, "millisecond"),
    }));
};
