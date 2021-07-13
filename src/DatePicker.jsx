/**
 * Date picker component.
 *
 * The month is zero-indexed. E.g. January is 0, February is 1 and so on.
 */
export const DatePicker = ({ month, year, onClick }) => {
  if (!month || !year) {
    return <></>;
  }

  // 0 (Sun) - 6 (Sat)
  const startDay = new Date(year, month, 1).getDay();
  // Setting day argument to 0 get the date from 1 day before
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array(daysInMonth)
    .fill(0)
    .map((_, index) => index + 1);

  // Pad the front of the array to get first day in the correct column
  const gridElems = Array(startDay).fill(null).concat(days);

  return (
    <div className="grid grid-cols-7 gap-4">
      {gridElems.map((elem, index) => {
        if (elem) {
          return (
            <button
              key={`item-${index}`}
              onClick={onClick}
              className="border w-6 h-6 rounded-full flex items-center justify-center p-4"
            >
              {elem}
            </button>
          );
        } else {
          return <span key={`item-${index}`}></span>;
        }
      })}
    </div>
  );
};
