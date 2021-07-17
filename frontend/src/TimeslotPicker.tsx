import dayjs from "dayjs";

export const TimeslotPicker = ({ date }: { date: dayjs.Dayjs }) => {
  return (
    <div>
      <h2 className="text-lg">{date.format("dddd D MMMM YYYY")}</h2>
      <div>
        <button className="block border min-w-full p-4 mt-4 rounded-lg hover:bg-blue-400 hover:text-gray-100">
          Timeslot
        </button>
      </div>
    </div>
  );
};
