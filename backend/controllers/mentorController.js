const prisma = require('../config/prismaClient');
const { RequestStatus } = require('../utils/statusEnums');

const getMenteeRequests = async (req, res) => {
    const userId = req.session.userId;
    try {
        const requests = await prisma.request.findMany({
            where: { mentorId: userId, status: RequestStatus.PENDING },
            include: {
                mentee: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        school: true,
                        major: true,
                        classification: true,
                        bio: true,
                        interest: {
                            select: {
                                interest: true,
                            }
                        },
                        preference: true
                    }
                }
            }
        })
        res.status(201).json(requests);
    } catch (err) {
        res.status(404).json({ error: "No requests for you", details: err.message });
    }
}

module.exports = { getMenteeRequests };