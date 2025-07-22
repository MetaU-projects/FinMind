const prisma = require('../config/prismaClient');
const { timeOverlaps, oneHourIntervals } = require('../utils/schedulingUtils');
const { getSessions, getAvailability, getFreeSlots } = require('../utils/scheduleHelpers');
const resolveConflict = require('../utils/resolveConflict');

const suggestSession = async (req, res) => {
    const menteeId = req.session.userId;
    const mentorId = parseInt(req.params.mentorId);

    if (Number.isNaN(mentorId)) {
        return res.status(400).json({ error: "MentorId is not a number" });
    }

    try {
        const user = await prisma.mentorship.findMany({
            where: { menteeId },
            select: {
                id: true,
                mentorId: true,
                mentorshipSession: true
            }
        });

        const mentor = await prisma.mentorship.findMany({
            where: { mentorId },
            select: {
                id: true,
                mentorshipSession: true
            }
        })

        const userAvailability = await prisma.availability.findMany({
            where: { userId: menteeId },
            select: {
                id: true,
                day: true,
                startTime: true,
                endTime: true
            }
        });

        const mentorAvailability = await prisma.availability.findMany({
            where: { userId: mentorId },
            select: {
                id: true,
                day: true,
                startTime: true,
                endTime: true
            }
        });

        const userSessions = getSessions(user);
        const userFree = getAvailability(userAvailability);
        const userSlots = getFreeSlots(userFree, userSessions);

        const mentorSessions = getSessions(mentor);
        const mentorFree = getAvailability(mentorAvailability);
        const mentorSlots = getFreeSlots(mentorFree, mentorSessions);

        const proposedSlots = oneHourIntervals(timeOverlaps(userSlots, mentorSlots));

        if (proposedSlots.length === 0) {
            return res.status(200).json({ proposedSession: proposedSlots, resolvedSession: [] });
        }

        const newSession = await resolveConflict(user, userSlots);
        if (newSession) {
            return res.status(200).json({ proposedSession: [], resolvedSession: newSession });
        }

        res.status(404).json({ message: "No available time found" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Something went wrong!" }, err);
    }
}

module.exports = suggestSession;
