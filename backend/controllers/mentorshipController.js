const prisma = require('../config/prismaClient');

const getAllConnections = async (req, res) => {
    const userId = req.session.userId;
    try {
        const connections = await prisma.mentorship.findMany({ where: { 
            OR: [
            { menteeId: userId }, 
            { mentorId: userId }
            ],
            status: 'ACTIVE'
        }});
        res.json(connections);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No active connections" });
    }
}

module.exports = { getAllConnections };