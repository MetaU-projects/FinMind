const { timeConversion, subtractInterval } = require('./schedulingUtils');

/**
 * Function to get all exisiting sessions of a user
 * 
 * @param {Array<{Object}>} mentorshipList - List of user's connections and their sessions
 * @returns {Array<[Number, Number]>} - Array of sorted user sessions
 * 
 */

const getSessions = (mentorshipList) => {
    const sessions = [];
    mentorshipList.map(record => {
        record.mentorshipSession.map(session => {
            sessions.push([session.startTime, session.endTime]);
        });
    });
    sessions.sort((a, b) => a[0] - b[0]);
    return sessions;
}

/**
 * Function to calculate the availability of a user by converting stored string of date and time
 * to the next recurring date and and time (unix time)
 * 
 * @param {Array<{Object}>} availList - List of usere's availability details such as day, startTime, and endTime
 * @returns {Array<[Number, Number]>} - List of free intervals in unix time
 * 
 */

const getAvailability = (availList) => {
    const freeTimes = [];
    for (const avail of availList) {
        const startTime = timeConversion(avail.day, avail.startTime);
        const endTime = timeConversion(avail.day, avail.endTime);
        freeTimes.push([startTime, endTime]);
    }
    return freeTimes;
}

/**
 * Function to get all the free slots by subtracting existing sessions from 
 * range of availability
 * 
 * @param {Array<[Number, Number]>} freeTimes - List of all user's free intervals 
 * @param {Array<[Number, Number]>} sessions - List of all user's existing sessions
 * @returns {Array<[Number, Number]>} - List of all user's free slots
 */

const getFreeSlots = (freeTimes, sessions) => {
    const slots = [];
    for (const free of freeTimes) {
        const result = subtractInterval(free, sessions);
        slots.push(...result);
    }
    return slots
}

module.exports = {
    getSessions,
    getAvailability,
    getFreeSlots,
}
