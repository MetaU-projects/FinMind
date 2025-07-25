const prisma = require("../config/prismaClient");
const { getAvailability, getSessions, getFreeSlots } = require("./scheduleHelpers");
const { oneHourIntervals } = require("./schedulingUtils");
const { Role } = require('./statusEnums')

/**
 * This function is used to return list of overlapping time ranges between 
 * @param {Array<[Number, Number]>} slots List of user's available slots
 * @param {Array} param1 - Array of free time ie the cancelled session.
 * @returns {boolean}
 */

const containsIntervals = (slots, [start, end]) => {
    return slots.some(([s, e]) => s <= start && e >= end);
}

const userCache = new Map();
/**
 * Function to get user's free slots from once using their Ids.
 * 
 * @param {Number} userId - User's Id
 * @returns {Object} - User's mapped data
 */

const loadUserData = async (userId) => {
    if (!userCache.has(userId)) {
        const [mentorshipInfo, availability] = await Promise.all([
            prisma.mentorship.findMany({
                where: {
                    OR: [
                        { mentorId: userId },
                        { menteeId: userId }
                    ]
                },
                select: { mentorshipSession: true }
            }),
            prisma.availability.findMany({
                where: { userId },
                select: {
                    id: true,
                    day: true,
                    startTime: true,
                    endTime: true
                }
            })
        ])

        userCache.set(userId, {
            freeSlots: oneHourIntervals(getFreeSlots(getAvailability(availability), getSessions(mentorshipInfo)))
        });
    }
    return userCache.get(userId);
}

/**
 * This function suggests users to reschedule with another mentor using a newly freed time slot.
 * @param {Object} params - The parameters object
 * @param {Number} params.userId - The ID of the user who cancelled the session.
 * @param {Number} params.startTime - The start time of the cancelled session ie freed time (Unix time).
 * @param {Number} params.endTime - The end time of the cancelled session ie freed time (Unix time)
 * @param {Number} params.otherUserId - The ID of the partner session was cancelled.
 * 
 * @returns {Array<{Object}>} - List of suggested reschedule options.
 */

const suggestFromFreedTime = async ({ userId, startTime, endTime, otherUserId }) => {
    const freedSlot = [startTime, endTime]
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) return [];

        const isMentee = user.role === Role.MENTEE;

        const mentorships = await prisma.mentorship.findMany({
            where: isMentee ? { menteeId: userId } : { mentorId: userId },
            include: {
                mentor: true,
                mentee: true,
            },
        });

        const suggestions = [];
        const userData = await loadUserData(userId);
        for (const mentorship of mentorships) {
            const partner = isMentee ? mentorship.mentor : mentorship.mentee;

            if (partner.id === otherUserId) continue;

            const partnerData = await loadUserData(partner.id);

            const userFree = userData.freeSlots;
            const partnerFree = partnerData.freeSlots;

            const userCanUse = containsIntervals(userFree, freedSlot);
            const mentorCanUse = containsIntervals(partnerFree, freedSlot);

            if (!userCanUse || !mentorCanUse) continue;

            suggestions.push({
                connectionId: mentorship.id,
                name: partner.name,
                withUser: partner.id,
                suggestTime: freedSlot
            })
        }

        return suggestions;
    } catch (err) {
        return "Error getting reschedule options"
    }
}

module.exports = { suggestFromFreedTime }