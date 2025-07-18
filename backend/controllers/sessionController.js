const prisma = require('../config/prismaClient');
const { Weekday } = require('../utils/statusEnums');
const { timeToMinutes, timeOverlaps, subtractInterval, timeFomatting } = require('../utils/schedulingUtils');

const suggestSession = async (req, res) => {
    const menteeId = req.session.userId;
    const mentorId = parseInt(req.params.mentorId);
    try {
        const user = await prisma.session.findMany({
            where: { menteeId },
            select: {
                id: true,
                startTime: true,
                endTime: true
            }
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

        const mentor = await prisma.session.findMany({
            where: { mentorId },
            select: {
                id: true,
                startTime: true,
                endTime: true
            }
        })

        const mentorAvailability = await prisma.availability.findMany({
            where: { userId: mentorId },
            select: {
                id: true,
                day: true,
                startTime: true,
                endTime: true
            }
        });

        const userSessions = {};
        user.map(session => {
            const time = timeFomatting(session.startTime, session.endTime)
            if (!userSessions[time.day]) {
                userSessions[time.day] = [];
            }
            userSessions[time.day].push([time.startTime, time.endTime]);
        });

        const mentorSessions = {};
        mentor.map(session => {
            const time = timeFomatting(session.startTime, session.endTime)
            if (!mentorSessions[time.day]) {
                mentorSessions[time.day] = [];
            }
            mentorSessions[time.day].push([time.startTime, time.endTime]);
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

        const mentorSlots = {};
        mentorAvailability.map(item => {
            const timePeference = { "startTime": item.startTime, "endTime": item.endTime };
            for (const [day, sessions] of Object.entries(mentorSessions)) {
                if (Weekday[item.day] === day) {
                    sessions.sort((a, b) => timeToMinutes(a[0]) - timeToMinutes(b[0]));
                    const result = subtractInterval(timePeference, sessions);
                    mentorSlots[day] = result;
                }
            }
        });

        let recommendedTimes = {}
        for (const [day, sessions] of Object.entries(mentorSlots)) {
            let userSlot = userSlots[day];
            if (userSlot) {
                const result = timeOverlaps(userSlot, sessions);
                if (!recommendedTimes[day]) recommendedTimes[day] = {};
                recommendedTimes[day] = result;
            }
        }
        res.status(200).json(recommendedTimes);

    } catch (err) {
        res.status(500).json({ error: "Error finding free time" }, err);
    }
}

module.exports = suggestSession;


