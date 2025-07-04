const prisma = require('../config/prismaClient');

const getMenteeRequests = async (req, res) => {
    const userId = req.session.userId;
    try {
        const requests = await prisma.request.findMany({
            where: { mentorId: userId, status: "PENDING" },
            include: { mentee: true }
        })
        res.status(201).json(requests);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No requests for you" });
    }
}

module.exports = { getMenteeRequests };