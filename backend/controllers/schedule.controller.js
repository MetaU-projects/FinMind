const { MS_PER_SECOND } = require('../config/constants');
const prisma = require('../config/prismaClient');

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
        res.status(500).json({ error: "Error creating a session", details: err.message })
    }
}

const removeSession = async (req, res) => {
    const sessionId = parseInt(req.params.sessionId);
    if (Number.isNaN(sessionId)) {
        return res.status(400).json({ error: "Session ID is not a number" });
    }
    try {
        await prisma.session.delete({
            where: { id: sessionId }
        });
        res.status(200).send();
    } catch (err) {
        res.status(404).json({ error: "Error removing session", details: err.message });
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
        res.status(500).json({ error: "Error getting sessions history", details: err.message });
    }
}

const upcomingSessions = async (req, res) => {
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
    } catch(err) {
        res.status(500).json({ error: "Error getting upcoming session", details: err.message });
    }
}

module.exports = {
    createSession,
    removeSession,
    sessionsHistory,
    upcomingSessions
}