const prisma = require('../config/prismaClient');
const { Role } = require('../utils/statusEnums');
const bfsAlgorithm = require('../utils/recommendUtils');
const { TOP_NUMBER, WEIGHTS, TEN_HOUR_SECONDS, FIVE_MINUTES } = require('../config/constants');
const recommendFromBios = require('../utils/generateRecommendations');
const { getOrSetCache } = require('../utils/cache');

const mentorRecomendations = async (req, res) => {
    const menteeId = req.session.userId;
    const cacheKey = `user:${menteeId}:recommendations`;
    const ttl = FIVE_MINUTES;

    try {
        const topMentors = await getOrSetCache(cacheKey, ttl, async () => {
            const mentee = await prisma.user.findUnique({
                where: { id: menteeId },
                select: {
                    id: true,
                    major: true,
                    school: true,
                    interest: true,
                    bio: true
                }
            });

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
                    interest: true,
                    bio: true
                }
            });

            const mentees = await prisma.user.findMany({
                where: {
                    role: Role.MENTEE
                },
                select: {
                    id: true,
                    menteeMentorships: true
                }
            });

            const mentorsList = await prisma.user.findMany({
                where: {
                    role: Role.MENTOR
                },
                select: {
                    id: true,
                    name: true,
                    mentorMentorships: true
                }
            });

            const interests = await prisma.interest.findMany({
                select: {
                    id: true,
                    _count: {
                        select: { interest: true }
                    }
                }
            });

            const menteeIntIds = new Set(mentee.interest.map(m => m.interestId));

            const filteredInterest = interests.filter(interest => interest._count.interest !== 0);
            const interestsCount = {};
            let maxCount = 0;
            for (let item of filteredInterest) {
                interestsCount[item.id] = item._count.interest;
                if (item._count.interest > maxCount) maxCount = item._count.interest;
            };

            const popularInterests = {};
            for (let id in interestsCount) {
                const weight = interestsCount[id] / maxCount;
                if (weight >= 0.5) popularInterests[id] = weight;
            }

            const otherRecom = bfsAlgorithm(mentees, mentorsList, menteeId);
            const bioScores = recommendFromBios(mentee.bio, mentors);
            const bioScoreMap = {};
            bioScores.forEach(({ id, score }) => {
                bioScoreMap[id] = score
            });

            const scoreMentors = mentors.map(mentor => {
                let score = 0;
                let interestScore = 0;
                mentor.interest.forEach(d => {
                    if (menteeIntIds.has(d.interestId)) {
                        interestScore += WEIGHTS.interest;
                        if (popularInterests[d.interestId]) {
                            interestScore += popularInterests[d.interestId] * WEIGHTS.bonus;
                        }
                    }
                });
                const schoolScore = mentee.school === mentor.school ? WEIGHTS.school : 0;
                const majorScore = mentee.major === mentor.major ? WEIGHTS.major : 0;
                const graphScore = otherRecom[mentor.id] ? otherRecom[mentor.id] * WEIGHTS.graph : 0;
                const bioScore = bioScoreMap[mentor.id] ? bioScoreMap[mentor.id] * WEIGHTS.bio : 0;

                score = interestScore + schoolScore + majorScore + graphScore + bioScore;

                return { ...mentor, score };
            });

            const filteredResult = scoreMentors.filter(item => item.score !== 0);
            const sortedList = filteredResult.sort((a, b) => b.score - a.score);
            return sortedList.slice(0, TOP_NUMBER);
        });

        res.status(200).json(topMentors);

    } catch (err) {
        res.status(500).json({ error: "Error getting recommendations", details: err.message });
    }
}

module.exports = mentorRecomendations;
