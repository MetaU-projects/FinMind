/**
 * Utility functions for working with time intervals in HH:mm format.
 * Includes conversion, comparison, overlap detection, and interval subtraction
 * 
 * Used in scheduling systems to align and manipulate mentee & mentors availability
 */

/**
 * Converts a time in string into total minutes
 * 
 * @param {string} time - A string in HH:mm 24-hour format 
 * @returns {number} Total minutes
 * 
 * @example
 * timetoMinutes("06:00") //returns 360
 */

const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

/**
 * Converts Javascript values into simplified format where
 * day is a week day and time is in HH:mm format
 * 
 * @param {Date | string} userStartTime - Start time as a Date object ISO string
 * @param {Date | string} userEndTime - End time as a Date object or ISO string
 * @returns {{ day: string, startTime: string, endTime: string }} -  An object with day and formatted times
 * 
 * @example timeFormatting("2025-07-21T10:00:00.000Z", "2025-07-21T11:00:00.000Z")
 * // returns { day: "Monday", startTime: "10:00", endTime: "11:00" }
 */

const timeFomatting = (userStartTime, userEndTime) => {
    const start = new Date(userStartTime);
    const end = new Date(userEndTime);
    const day = start.toLocaleDateString('en-US', { weekday: "long" });
    const startTime = start.toLocaleTimeString('en-US', { timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: false });
    const endTime = end.toLocaleTimeString('en-US', { timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: false });

    return { day, startTime, endTime };
}

/**
 * Finds all overlapping intervals between two arrays of sessions (time intervals)
 * Sessions are represented as [start, end]
 * 
 * @param {Array<[string, string]>} menteeSlots - First array of sessions
 * @param {Array<[string, string]>} mentorSlots - Second array of sessions
 * @returns {Array<[string, string]>} - Array of intervals that overlap between two sets
 * 
 * @example
 * timeOverlaps([["10:00", "11:00"], ["13:00", "14:00"]], [["9:00", "13:00"], ["14:00", "15:00"]])
 * // returns  [["10:00", "11:00"]]
 */

const timeOverlaps = (menteeSlots, mentorSlots) => {
    let i = j = 0;
    let result = [];
    let start, end;

    while (i < menteeSlots.length && j < mentorSlots.length) {
        a = menteeSlots[i];
        b = mentorSlots[j];

        start = timeToMinutes(a[0]) > timeToMinutes(b[0]) ? a[0] : b[0];
        end = timeToMinutes(a[1]) < timeToMinutes(b[1]) ? a[1] : b[1];

        if (timeToMinutes(start) < timeToMinutes(end)) {
            result.push([start, end]);
        }

        if (timeToMinutes(a[1]) < timeToMinutes(b[1])) i++;
        else j++;
    }
    return result;
}

/**
 * Subtracts session intervals from an available interval and return resulting free slots for each available days
 * 
 * @param {[string, string]} avail - The availability interval
 * @param {Array<[string, string]>} sessions - The existing session to subtract
 * @returns {Array<[string, string]>} Free time
 * 
 * @example
 * subtractInterval(["9:00", "14:00"], [["10:00", "12:00"], ["12:00", "13:00"]])
 * // returns [["9:00", "10:00"], ["13:00", "14:00"]]
 */

const subtractInterval = (avail, sessions) => {
    let result = [];
    let start = avail.startTime;
    let time;
    for (let session of sessions) {
        time = session;
        if (timeToMinutes(start) < timeToMinutes(session[0])) {
            result.push([start, session[0]]);
        }
        if (timeToMinutes(start) < timeToMinutes(session[1])) start = session[1];
    }
    if (timeToMinutes(start) < timeToMinutes(avail.endTime)) {
        result.push([start, avail.endTime]);
    }
    return result;
}

module.exports = {
    timeToMinutes,
    timeOverlaps,
    subtractInterval,
    timeFomatting
}