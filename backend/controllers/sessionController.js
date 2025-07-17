const prisma = require('../config/prismaClient');
const { Weekday } = require('../utils/statusEnums');
const { timeToMinutes, timeOverlaps, subtractInterval, timeFomatting } = require('../utils/schedulingUtils');

const suggestSession = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const user = await prisma.session.findMany({
            where: { menteeId },
            select: {
                id: true,
                mentorId: true,
                startTime: true,
                endTime: true
            }
        });

        const userSessions = {};
        const connectionIds = new Set();
        user.map(session => {
            const time = timeFomatting(session.startTime, session.endTime)
            if (!userSessions[time.day]) {
                userSessions[time.day] = [];
            }
            userSessions[time.day].push([time.startTime, time.endTime]);

            if (!connectionIds.has(session.mentorId)) connectionIds.add(session.mentorId);
        });

        const mentorIds = [...connectionIds];
        const mentorsFilled = await prisma.session.findMany({
            where: { mentorId: { in: mentorIds }, menteeId: { not: menteeId } },
            select: {
                id: true,
                mentorId: true,
                startTime: true,
                endTime: true
            }
        });

        const mentorSessions = {};
        mentorsFilled.map(mentor => {
            const time = timeFomatting(mentor.startTime, mentor.endTime);
            if (!mentorSessions[mentor.mentorId]) {
                mentorSessions[mentor.mentorId] = {};
            }
            if (!mentorSessions[mentor.mentorId][time.day]) {
                mentorSessions[mentor.mentorId][time.day] = [];
            }
            mentorSessions[mentor.mentorId][time.day].push([time.startTime, time.endTime]);
        });

        const userAvailability = await prisma.availability.findMany({
            where: { userId: menteeId },
            select: {
                id: true,
                day: true,
                startTime: true,
                endTime: true
            }
        });

        const userSlots = {};
        userAvailability.map(item => {
            const timePeference = { "startTime": item.startTime, "endTime": item.endTime };
            for (const [day, sessions] of Object.entries(userSessions)) {
                if (Weekday[item.day] === day) {
                    sessions.sort((a, b) => timeToMinutes(a[0]) - timeToMinutes(b[0]));
                    const result = subtractInterval(timePeference, sessions);
                    userSlots[day] = result;
                }
            }
        });

        const mentorsAvail = await prisma.availability.findMany({
            where: { userId: { in: mentorIds } }
        });

        const mentorSlots = {};
        mentorsAvail.map(item => {
            for (const [id, weekday] of Object.entries(mentorSessions)) {
                const timePeference = { "startTime": item.startTime, "endTime": item.endTime };
                for (const [day, sessions] of Object.entries(weekday)) {
                    if (Weekday[item.day] === day) {
                        sessions.sort((a, b) => timeToMinutes(a[0]) - timeToMinutes(b[0]));
                        const result = subtractInterval(timePeference, sessions);
                        if (!mentorSlots[item.userId]) mentorSlots[item.userId] = {};
                        mentorSlots[item.userId][day] = result;
                    }
                }
            }
        });

        let recommendedTimes = {}
        for (const [id, weekday] of Object.entries(mentorSlots)) {
            for (const [day, sessions] of Object.entries(weekday)) {
                let menteeSlot = userSlots[day];
                if (menteeSlot) {
                    const result = timeOverlaps(menteeSlot, sessions);
                    if (!recommendedTimes[id]) recommendedTimes[id] = {};
                    recommendedTimes[id][day] = result;
                }
            }
        }
        res.status(200).json(recommendedTimes);

    } catch (err) {
        res.status(500).json({ error: "Error finding free time" }, err);
    }
}

module.exports = suggestSession;


