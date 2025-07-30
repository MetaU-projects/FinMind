import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timezone;

export const formatUnixTimes = (startTime, endTime) => {
    const start = dayjs.unix(startTime).tz(userTimeZone);
    const end = dayjs.unix(endTime).tz(userTimeZone);

    return `${start.format('MM/DD/YYYY h:mm A')} - ${end.format('h:mm A')}`;
}