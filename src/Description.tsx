export const Description = ({
  name,
  eventTitle,
  duration,
  eventDescription,
}: {
  name: string;
  eventTitle: string;
  duration: number;
  eventDescription: string;
}) => (
  <div>
    <h2 className={"text-lg font-semibold"}>{name}</h2>
    <h1 className={"font-bold text-2xl"}>{eventTitle}</h1>

    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className={"inline text-gray-600 align-middle px-1 py-2"}>
        {duration}
      </p>
    </div>

    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <select className={"text-gray-600 align-middle px-1 py-2"}>
        <option value="value1">Value1</option>
        <option value="value2">Value2</option>
        <option value="value3">Value3</option>
        <option value="value4">Value4</option>
      </select>
    </div>

    <p className={"text-base text-gray-700"}>{eventDescription}</p>
  </div>
);
