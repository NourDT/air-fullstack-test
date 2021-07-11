export const slotsGenerator = (start, end) => {
  let items = [];
  for (let hour = start; hour < end; hour++) {
    items.push([hour, 0]);
    items.push([hour, 30]);
  }

  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const range = items.map((time) => {
    const [hour, minute] = time;
    date.setHours(hour);
    date.setMinutes(minute);

    return formatter.format(date);
  });
  return range;
};
