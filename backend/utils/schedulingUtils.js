const { DAYS_IN_WEEK, ONE_HOUR_SECONDS, MS_PER_SECOND } = require('../config/constants');
const { DayMap } = require('./statusEnums');

/**
 * Utility functions for working with time intervals in HH:mm format.
 * Includes conversion, overlap detection, interval subtraction, and one hour intervals
 * 
 * Used in scheduling systems to align and manipulate mentee & mentors availability
 */

/**
 * Finds all overlapping intervals between two arrays of sessions (time intervals)
 * Sessions are represented as [start, end]
 * 
 * @param {Array<[Number, Number]>} menteeSlots - First array of sessions
 * @param {Array<[Number, Number]>} mentorSlots - Second array of sessions
 * @returns {Array<[Number, Number]>} - Array of intervals that overlap between two sets
 *
 */

const timeOverlaps = (menteeSlots, mentorSlots) => {
    let i = j = 0;
    let result = [];
    let start, end;

    while (i < menteeSlots.length && j < mentorSlots.length) {
        let a = menteeSlots[i];
        let b = mentorSlots[j];

        start = a[0] > b[0] ? a[0] : b[0];
        end = a[1] < b[1] ? a[1] : b[1];

        if (start < end) {
            result.push([start, end]);
        }

        if (a[1] < b[1]) i++;
        else j++;
    }
    return result;
}

/**
 * Subtracts session intervals from an available interval and return resulting free slots for each available days
 * 
 * @param {[string, string]} avail - The availability interval
 * @param {Array<[Number, Number]>} sessions - The existing session to subtract
 * @returns {Array<[Number, Number]>} - Free tğmes
 * 
 */

const subtractInterval = (preference, sessions) => {
    let result = [];
    let [start, end] = preference;
    let currentStart = start
    for (const [sessStart, sessEnd] of sessions) {
        if (sessStart > currentStart) {
            result.push([currentStart, Math.min(sessStart, end)]);
        }
        currentStart = Math.max(currentStart, sessEnd);
        if (currentStart >= end) break;
    }
    if (start < end) {
        result.push([currentStart, end]);
    }
    return result;
}

/**
 * Converts 24-hour formatted time in strings to unix time of the next recurring day.
 * 
 * @param {string} day - The target day
 * @param {string} time - The time in the day
 * @returns {Number} - Converted Unix Time
 * 
 * @example
 * timeConversion("MONDAY", 14:00) // returns 	1753131600
 */

const timeConversion = (day, time) => {
    const today = new Date();
    const todayDay = today.getDay();
    const now = new Date();

    const targetDay = DayMap[day];
    const slotTime = new Date(today);
    const [hour, minute] = time.split(':').map(Number);
    slotTime.setHours(hour, minute, 0, 0);

    let daysAhead = (targetDay - todayDay + DAYS_IN_WEEK) % DAYS_IN_WEEK;
    if(daysAhead === 0 && slotTime < now) daysAhead = DAYS_IN_WEEK;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysAhead);
    nextDate.setHours(hour, minute, 0, 0);

    const unixTime = Math.floor(nextDate.getTime() / MS_PER_SECOND)

    return unixTime;
}

/**
 * Function to convert a range of time interval into one hour slots.
 * 
 * @param {Array<[Number, Number]} timeRange - Range of time to be broken down
 * @returns {Array<[Number, Number]} - One hour time durations
 * 
 */

const oneHourIntervals = (timeRange) => {
    let result = [];
    for(const time of timeRange) {
        let start = time[0];
        let end = start + ONE_HOUR_SECONDS;
        while (end <= time[1]){
            result.push([start, end]);
            start = end;
            end = start + ONE_HOUR_SECONDS;
        }
    }
    return result;
}

module.exports = {
    timeOverlaps,
    subtractInterval,
    timeConversion,
    oneHourIntervals
}