export interface ResultProps {
  city?: string;
  country?: string;
  status?: string;
  description?: string;
  temperatureMin?: string;
  temperatureMax?: string;
  humidity?: string;
  className?: string;
  time?: string;
}

export const Result = (props: ResultProps) => {
  const {
    city,
    country,
    status,
    description,
    temperatureMin,
    temperatureMax,
    humidity,
    time,
    className,
  } = props;
  return (
    <div className={className}>
      <div>
        <p className="text-gray-500 text-sm">
          {city}, {country}
        </p>
        <h1 className="text-3xl font-bold">{status}</h1>
      </div>
      <div className="text-sm mt-6">
        <div className="w-64 flex justify-between">
          <div>
            <p className="text-gray-500">Description:</p>
            <p className="text-gray-500">Temperature:</p>
            <p className="text-gray-500">Humidity:</p>
            <p className="text-gray-500">Time</p>
          </div>
          <div>
            <p>{description}</p>
            <p>
              {temperatureMin}°C ~ ${temperatureMax}°C
            </p>
            <p>{humidity}%</p>
            <p>{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
