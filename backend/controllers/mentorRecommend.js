const prisma = require('../config/prismaClient');
const { Role } = require('../utils/statusEnums');
const getRecommendations = require('../utils/getRecommendations');

const recommendation = async (req, res) => {
    const menteeId = req.session.userId;

    const menteeInterest = await prisma.user.findUnique({
        where: { id: menteeId },
        select: { description: true }
    });

    const mentors = await prisma.user.findMany({
        where: {
            role: Role.MENTOR,
            mentorMentorships: { none: { menteeId: menteeId } },
            mentorRequests: { none: { menteeId: menteeId } }
        },
        select: { id: true, description: true }
    });

    const results = await getRecommendations(menteeInterest, mentors);
    const topMentors = results.filter(r => r.score > 0)
    const mentorIds = topMentors.map(mentor => mentor.id)
    const recommendedMentors = await prisma.user.findMany({
        where: {
            id: {
                in: mentorIds
            }
        }
    });

    const scoreMentors = {};
    topMentors.map(m => { scoreMentors[m.id] = m.score });

    const mentorsWithScores = recommendedMentors.map(mentor => ({
        ...mentor,
        score: scoreMentors[mentor.id]
    }));

    mentorsWithScores.sort((a, b) => b.score - a.score)
    res.status(201).json(mentorsWithScores);
}

module.exports = { recommendation };