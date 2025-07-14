const prisma = require('../config/prismaClient');
const { Role } = require('../utils/statusEnums');

const mentorRecomendations = async (req, res) => {
    const menteeId = req.session.userId

    try {

        const mentee = await prisma.user.findUnique({
            where: { id: menteeId },
            select: {
                id: true,
                major: true,
                school: true,
                interest: true
            }
        })

        const mentors = await prisma.user.findMany({
            where: {
                role: Role.MENTOR,
                mentorMentorships: { none: { menteeId: menteeId } },
                mentorRequests: { none: { menteeId: menteeId } }
            },
            select: {
                id: true,
                name: true,
                role: true,
                school: true,
                major: true,
                interest: true
            }
        });

        const interests = await prisma.interest.findMany({
            select: {
                id: true,
                _count: {
                    select: { interest: true }
                }
            }
        })

        const menteeIntIds = new Set(mentee.interest.map(m => m.interestId))

        const filteredInterest = interests.filter(interest => interest._count.interest !== 0);
        const interestsCount = {}
        let maxCount = 0
        for (let item of filteredInterest) {
            interestsCount[item.id] = item._count.interest
            if (item._count.interest > maxCount) maxCount = item._count.interest
        }

        const popularInterests = {}
        for (let id in interestsCount) {
            const weight = interestsCount[id] / maxCount
            if (weight >= 0.5) popularInterests[id] = weight
        }

        const scoreMentors = mentors.map(mentor => {
            let score = 0;
            if (mentor.interest == 0) score -= 1
            mentor.interest.map(d => {
                if (menteeIntIds.has(d.interestId)) {
                    score += 1
                    if (popularInterests[d.interestId]) score += popularInterests[d.interestId]
                }
            })
            if (mentee.school === mentor.school) score += 1
            if (mentee.major === mentor.major) score += 2

            return { ...mentor, score }
        })

        const filteredResult = scoreMentors.filter(item => item.score !== 0);
        const sortedList = filteredResult.sort((a, b) => b.score - a.score)
        const topMentors = sortedList.slice(0, 10)

        res.status(200).json(topMentors);

    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Could not get recommendations" });
    }
}

module.exports = mentorRecomendations;