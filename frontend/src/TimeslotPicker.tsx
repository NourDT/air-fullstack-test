import dayjs from "dayjs";

type TimeslotPickerProps = {
  date: dayjs.Dayjs;
  slots: dayjs.Dayjs[];
};

export const TimeslotPicker = (props: TimeslotPickerProps) => (
  <div>
    <h2 className="text-lg">{props.date.format("dddd D MMMM YYYY")}</h2>
    <div className="h-96 overflow-y-auto">
      {props.slots.length === 0 ? (
        <p className="font-medium mt-4">No available timeslots</p>
      ) : (
        props.slots.map((value) => (
          <button
            key={value.valueOf()}
            className="block border min-w-full p-4 mt-4 rounded-lg hover:bg-blue-400 hover:text-gray-100"
          >
            {value.format("hh:mma")}
          </button>
        ))
      )}
    </div>
  </div>
);
