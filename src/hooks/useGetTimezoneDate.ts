import { DateTime } from "luxon";

export const useGetTimezoneDate = (offsetSeconds: number): string => {
  const offsetHours = offsetSeconds / 3600;
  const sign = offsetHours < 0 ? "-" : "+";
  const hours = Math.abs(Math.floor(offsetHours)).toString().padStart(2, "0");
  const minutes = ((Math.abs(offsetHours) * 60) % 60)
    .toString()
    .padStart(2, "0");
  const timezone = `UTC${sign}${hours}:${minutes}`;
  const timezoneDate = DateTime.now().setZone(timezone);
  return timezoneDate.toFormat("yyyy-MM-dd hh:mm a");
};
