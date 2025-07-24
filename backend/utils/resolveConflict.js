const { oneHourIntervals, timeOverlaps } = require('./schedulingUtils');
const { getSessions, getAvailability, getFreeSlots } = require('../utils/scheduleHelpers');
const prisma = require('../config/prismaClient');
const { MS_PER_SECOND } = require('../config/constants');

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
 * Function that finds another to to shift a time where conflict exists
 * 
 * @param {Object} user - Logged in user details that includling sessions
 * @param {Array<[Number, Number]} conflictRange - 1 hour interval list of conflicting range with mentor
 * @param {Array<[Number, Number]} userSlots - List of free slots user has ie availability - existing sessions
 * @returns {Object} - proposed free time and rescheduling options
 * 
 */ 
const now = Math.floor(Date.now()/MS_PER_SECOND);
const resolveConflict = async (user, userSlots, newMentorSlots) => {
    const allSessions = user.flatMap(connection =>
        connection.mentorshipSession.map(session => ({
            ...session,
            mentorId: connection.mentorId
        }))
    );
    const filteredSessions = allSessions.filter(s=> s.endTime > now);
    for (const session of filteredSessions) {
        const mentorData = await loadMentorData(session.mentorId);

        const free = getFreeSlots(mentorData.availability, mentorData.sessions)
        const mutual = getFreeSlots((timeOverlaps(userSlots, free)), newMentorSlots)
        const rescheduleOptions = oneHourIntervals(mutual);
        if(!rescheduleOptions.length){
            continue;
        }
        if (rescheduleOptions) {
            return {
                sessionToCancel: session.id,
                freedTime: [session.startTime, session.endTime],
                rescheduleTo: rescheduleOptions[0]
            }
        }
    }
    return null;
}

module.exports = resolveConflict;