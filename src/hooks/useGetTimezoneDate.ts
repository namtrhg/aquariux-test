import { DateTime } from 'luxon';

export const useGetTimezoneDate = async (offsetSeconds: number): Promise<string> => {
  const timezoneDate = DateTime.now().setZone(`UTC+${offsetSeconds / 3600}`);
  return timezoneDate.toFormat('yyyy-MM-dd hh:mm a');
}
