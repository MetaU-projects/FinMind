const { MS_PER_SECOND } = require('../config/constants');
const prisma = require('../config/prismaClient');
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
const { suggestFromFreedTime } = require('../utils/freeSelfTime');
dayjs.extend(isoWeek);

const getTotalUpcoming = async (req, res) => {
    const userId = req.session.userId;

    const startOfWeek = dayjs().startOf('isoWeek').unix();
    const endOfWeek = dayjs().endOf('isoWeek').unix();
    try {
        const totalUpcoming = await prisma.session.count({
            where: {
                startTime: {
                    gte: startOfWeek,
                    lte: endOfWeek,
                },
                mentorship: {
                    OR: [
                        { menteeId: userId },
                        { mentorId: userId }
                    ]
                }
            }
        })
        res.status(200).json(totalUpcoming);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong!", details: err.message })
    }
}

const createSession = async (req, res) => {
    const { mentorshipId, startTime, endTime, reason, cancelable } = req.body;
    try {
        const session = await prisma.session.create({
            data: {
                mentorshipId,
                startTime,
                endTime,
                reason,
                cancelable
            }
        })
        res.status(201).json(session)
    } catch (err) {
        res.status(500).json({ error: "Error creating a session", details: err.message })
    }
}

const removeSession = async (req, res) => {
    const sessionId = parseInt(req.params.sessionId);
    const userId = req.session.userId;
    if (Number.isNaN(sessionId)) {
        return res.status(400).json({ error: "Session ID is not a number" });
    }
    try {
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: {
                mentorship: {
                    select: { menteeId: true, mentorId: true }
                }
            }
        });

        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }

        const { startTime, endTime, cancelable, mentorship } = session;
        if(!cancelable) {
            return res.status(200).json({ message: "This session cannot be cancelled", suggestions: [] })
        }

        const otherUserId = userId === mentorship.mentorId ? mentorship.menteeId : mentorship.mentorId;
        await prisma.session.delete({ where: { id: sessionId } });

        let suggestions = [];
        suggestions = await suggestFromFreedTime({ userId, startTime, endTime, otherUserId });
        res.status(200).json({ message: "Session cancelled successfully!", suggestions });

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
    } catch (err) {
        res.status(500).json({ error: "Error getting upcoming session", details: err.message });
    }
}

module.exports = {
    createSession,
    removeSession,
    sessionsHistory,
    upcomingSessions,
    getTotalUpcoming
}