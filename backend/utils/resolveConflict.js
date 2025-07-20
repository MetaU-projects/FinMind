const { oneHourIntervals, timeOverlaps } = require('./schedulingUtils');
const { getSessions, getAvailability, getFreeSlots } = require('../utils/scheduleHelpers');
const prisma = require('../config/prismaClient');
const { TOP_NUMBER } = require('../config/constants');

const mentorCache = new Map();

/**
 * Function to get mentor's session and availability once using mentorId.
 * 
 * @param {Number} mentorId - Mentor's Id
 * @returns {Object} - Mentor's data
 */

const loadMentorData = async (mentorId) => {
    if (!mentorCache.has(mentorId)) {
        const mentor = await prisma.mentorship.findMany({
            where: { mentorId },
            select: { mentorshipSession: true }
        });
        const availability = await prisma.availability.findMany({
            where: { userId: mentorId },
            select: {
                id: true,
                day: true,
                startTime: true,
                endTime: true
            }
        });
        
        mentorCache.set(mentorId, {
            sessions: getSessions(mentor),
            availability: getAvailability(availability)
        });
    }
    return mentorCache.get(mentorId);
}

/**
 * Function to get the blocked session from a list of sessions and conflict times that needs to be resolved
 * 
 * @param {Array<[Number, Number]>} sessions - list of existing sessions
 * @param {Number} start - Start of conflicting time
 * @param {Number} end - - End of conflicting time
 * @returns {Array<[Object]>}
 */

const filterOverlaps = (sessions, start, end) => {
    return sessions.filter(s => s.startTime < end && s.endTime > start);
}

/**
 * Function that finds another to to shift a time where conflict exists
 * 
 * @param {Object} user - Logged in user details that includling sessions
 * @param {Array<[Number, Number]} conflictRange - 1 hour interval list of conflicting range with mentor
 * @param {Array<[Number, Number]} userSlots - List of free slots user has ie availability - existing sessions
 * @returns {Object} - proposed free time and rescheduling options
 * 
 */

const resolveConflict = async (user, conflictRange, userSlots) => {
    const allSessions = user.flatMap(connection =>
        connection.mentorshipSession.map(session => ({
            ...session,
            mentorId: connection.mentorId
        }))
    );
    
    for (const conflict of conflictRange) {
        const [start, end] = conflict;
        const blockers = filterOverlaps(allSessions, start, end);
        const blocker = blockers[0];
        const mentorData = await loadMentorData(blocker.mentorId);

        const free = getFreeSlots(mentorData.availability, mentorData.sessions)
        const rescheduleOptions = oneHourIntervals(timeOverlaps(userSlots, free));

        return {
            sessionToCancel: blocker.id,
            freedTime: [blocker.startTime, blocker.endTime],
            rescheduleTo: rescheduleOptions.slice(0, TOP_NUMBER)
        }
    }
return null;
}

module.exports = resolveConflict;