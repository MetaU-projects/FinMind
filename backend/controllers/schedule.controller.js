const { MS_PER_SECOND } = require('../config/constants');
const prisma = require('../config/prismaClient');
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);

const getTotalUpcoming = async (req, res) => {

    const startOfWeek = dayjs().startOf('isoWeek').unix();
    const endOfWeek = dayjs().endOf('isoWeek').unix();

    const totalUpcomingSessionThisWeek = await prisma.session.count({
        where: {
            startTime: {
                gte: startOfWeek,
                lte: endOfWeek,
            }
        }
    })

    res.json(totalUpcomingSessionThisWeek);

}

const createSession = async (req, res) => {
    const { mentorshipId, startTime, endTime, reason } = req.body;
    try {
        const session = await prisma.session.create({
            data: {
                mentorshipId,
                startTime,
                endTime,
                reason
            }
        })
        res.status(201).json(session)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Error creating a session" }, err)
    }
}

const removeSession = async (req, res) => {
    const sessionId = parseInt(req.params.sessionId);
    if (Number.isNaN(mentorshipId)) {
        return res.status(400).json({ error: "Session ID is not a number" });
    }
    try {
        await prisma.session.delete({
            where: { id: sessionId }
        });
        res.status(200).send();
    } catch (err) {
        res.status(404).json({ error: "Error removing session" }, err);
    }
}

const sessionsHistory = async (req, res) => {
    const mentorshipId = parseInt(req.params.mentorshipId);
    if (Number.isNaN(mentorshipId)) {
        return res.status(400).json({ error: "Mentorship ID not a number" });
    }
    const now = Math.floor(Date.now() / MS_PER_SECOND);
    try {
        const pastSessions = await prisma.session.findMany({
            where: {
                mentorshipId: mentorshipId,
                endTime: {
                    lt: now,
                }
            },
            orderBy: {
                endTime: 'desc'
            }
        });
        res.status(200).json(pastSessions);
    } catch (err) {
        res.status(500).json({ error: "Error getting sessions history" }, err);
    }
}

const upComingSessions = async (req, res) => {
    const mentorshipId = parseInt(req.params.mentorshipId);
    if (Number.isNaN(mentorshipId)) {
        return res.status(400).json({ error: "Mentorship ID not a number" });
    }
    const now = Math.floor(Date.now() / MS_PER_SECOND);
    try {
        const upcomings = await prisma.session.findMany({
            where: {
                mentorshipId: mentorshipId,
                startTime: {
                    gt: now
                }
            },
            orderBy: {
                startTime: 'asc'
            }
        })
        res.status(200).json(upcomings);
    } catch (err) {
        res.status(500).json({ error: "Error getting upcoming session" }, err);
    }
}

module.exports = {
    createSession,
    removeSession,
    sessionsHistory,
    upComingSessions,
    getTotalUpcoming
}