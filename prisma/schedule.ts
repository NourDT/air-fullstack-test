/**
 * Get free timeslots.
 * @param bookings Sorted array of bookings
 * @param start Start time.
 * @param end End time.
 * @param durationMinutes Event duration.
 * @returns A list of timeslots.
 */
export const freeSlots = (
  bookings: { startTime: Date; endTime: Date }[],
  start: Date,
  end: Date,
  durationMinutes: number
): Date[] => {
  const slots = [];

  // Push timeslots with no overlap
  let bookingsIndex = 0;
  let date = start;
  for (; date < end && bookingsIndex < bookings.length; ) {
    if (date < bookings[bookingsIndex].startTime) {
      // Not overlapping with any bookings
      slots.push(new Date(date));
    } else if (date >= bookings[bookingsIndex].endTime) {
      // Overshot the current booking
      bookingsIndex++;
      continue;
    }
    date.setMinutes(date.getMinutes() + durationMinutes);
  }

  // Push remaining timeslots
  for (; date < end; date.setMinutes(date.getMinutes() + durationMinutes)) {
    slots.push(new Date(date));
  }

  return slots;
};
