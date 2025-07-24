import dayjs from 'dayjs';

export const formatUnixTimes = (startTime, endTime) => {
    const start = dayjs.unix(startTime);
    const end = dayjs.unix(endTime);

    return `${start.format('MM/DD/YYYY h:mm A')} - ${end.format('h:mm A')}`;
}