const prisma = require('../config/prismaClient');
const { ConnectionStatus, Role } = require('../utils/statusEnums');

const getAllConnections = async (req, res) => {
    const userId = req.session.userId;
    const { role } = req.query;
    try {
        let connections;
        switch (role) {
            case Role.MENTOR:
                connections = await prisma.mentorship.findMany({
                    where: { mentorId: userId },
                    include: { mentee: true }
                })
                return res.status(201).json(connections);
            case Role.MENTEE:
                connections = await prisma.mentorship.findMany({
                    where: { menteeId: userId },
                    include: { mentor: true }
                })
                return res.status(201).json(connections);
            default:
                res.status(404).json({ error: "Role is invalid!" });
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No active connections" });
    }
}

const createMentorship = async (req, res) => {
    const { menteeId, mentorId } = req.body;
    try {
        const requestStatus = await prisma.request.findUnique({
            where: {
                menteeId_mentorId_status: {
                    menteeId,
                    mentorId,
                    status: ConnectionStatus.ACCEPTED
                }
            }
        });

        if (!requestStatus) {
            return res.status(404).json({ error: "Connection declined" });
        }
        const connected = await prisma.mentorship.create({ data: { menteeId, mentorId } });
        res.status(201).json(connected);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Failure to connect!" });
    }
}

const updateMentorship = async (req, res) => {
    const { connectionId, status, endedAt } = req.body;
    try {
        const updateConnection = await prisma.request.update({
            where: { id: connectionId },
            data: { status, endedAt }
        });
        res.status(201).json(updateConnection);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Error updating connection!" });
    }
}

const endMentorship = async (req, res) => {
    const connectionId = parseInt(req.params.connectionId);
    try {
        const connection = await prisma.mentorship.findUnique({
            where: { id: connectionId },
            select: { mentorId: true, menteeId: true }
        });
        if (!connection) {
            return res.status(404).json({ error: "Mentorship not found" });
        }

        const { menteeId, mentorId } = connection;

        const request = await prisma.request.findFirst({
            where: { menteeId, mentorId }
        })
        await prisma.mentorship.delete({ where: { id: connectionId } });

        if (request) {
            await prisma.request.delete({ where: { id: request.id } });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Failure ending connection" });
    }
}

const requestConnection = async (req, res) => {
    const { menteeId, mentorId } = req.body;
    try {
        const request = await prisma.request.create({
            data: { menteeId, mentorId },
            include: { mentor: true }
        });
        res.status(201).json(request);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Failure to send request!" });
    }
}

const updateRequestStatus = async (req, res) => {
    const { requestId, status, respondedAt } = req.body;
    try {
        const updateRequest = await prisma.request.update({
            where: { id: requestId },
            data: { status, respondedAt }
        });
        res.status(201).json(updateRequest);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Error responding to request!" });
    }
}

module.exports = {
    getAllConnections,
    requestConnection,
    updateRequestStatus,
    createMentorship,
    updateMentorship,
    endMentorship
};