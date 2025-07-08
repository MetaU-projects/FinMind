const prisma = require('../config/prismaClient');
const { RequestStatus } = require('../utils/statusEnums');

const getMenteeRequests = async (req, res) => {
    const userId = req.session.userId;
    try {
        const requests = await prisma.request.findMany({
            where: { mentorId: userId, status: RequestStatus.PENDING },
            include: { mentee: true }
        })
        res.status(201).json(requests);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No requests for you" });
    }
}

module.exports = { getMenteeRequests };