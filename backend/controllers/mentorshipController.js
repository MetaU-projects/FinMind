const prisma = require('../config/prismaClient');

const getAllConnections = async (req, res) => {
    const userId = req.session.userId;
    try {
        const connections = await prisma.mentorship.findMany({
            where: {
                OR: [
                    { menteeId: userId },
                    { mentorId: userId }
                ],
                status: 'ACTIVE'
            }
        });
        res.json(connections);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No active connections" });
    }
}

const requestConnection = async (req, res) => {
    const { menteeId, mentorId } = req.body;
    try {
        const request = await prisma.request.create({
            data: { menteeId, mentorId }
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
        const update = await prisma.request.update({
            where:{ id: requestId},
            data: { status, respondedAt }
        });
        res.status(201).json(update);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Error responding to request!" });
    }
}

module.exports = { getAllConnections, requestConnection, updateRequestStatus };