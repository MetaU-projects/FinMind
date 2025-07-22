const prisma = require('../config/prismaClient');
const { RequestStatus, Role } = require('../utils/statusEnums');

const getMentors = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const mentors = await prisma.user.findMany({
            where: {
                role: Role.MENTOR,
                mentorMentorships: { none: { menteeId: menteeId } },
                mentorRequests: { none: { menteeId: menteeId } }
            }
        });
        res.json(mentors);
    } catch (err) {
        res.status(404).json({ error: "No mentor found, try again later!" }, err);
    }
}

const pendingRequests = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const pending = await prisma.request.findMany({
            where: { menteeId, status: RequestStatus.PENDING },
            include: { mentor: true }
        })
        res.status(201).json(pending);
    } catch (err) {
        res.status(404).json({ error: "No pending requests" }, err);
    }
}

const removeRequest = async (req, res) => {
    const requestId = parseInt(req.params.requestId);
    try {
        await prisma.request.delete({
            where: { id: requestId }
        });
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ error: "Error removing request" }, err);
    }
}

module.exports = { getMentors, pendingRequests, removeRequest };