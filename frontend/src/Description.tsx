type DescriptionProps = {
  name: string;
  eventTitle: string;
  durationMinutes: number;
  eventDescription: string;
};

export const Description = ({
  name,
  eventTitle,
  durationMinutes,
  eventDescription,
}: DescriptionProps) => (
  <div>
    <h2 className={"text-lg font-semibold"}>{name}</h2>
    <h1 className={"font-bold text-2xl"}>{eventTitle}</h1>

    <div className="pt-4">
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
      <p className="inline text-gray-600 align-middle px-1 py-2">
        {durationMinutes} minutes
      </p>
    </div>
    <p className="text-base text-gray-700 pt-4">{eventDescription}</p>
  </div>
);
