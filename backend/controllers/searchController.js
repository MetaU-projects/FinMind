const prisma = require('../config/prismaClient');
const { fuzzySearch } = require('../utils/fuzzySearch');
const { Role } = require('../utils/statusEnums');

const searchMentors = async (req, res) => {
    const menteeId = req.session.userId;
    const { query } = req.query;

    if(!query || query.trim() === ''){
        return res.status(400).json({ error: "Enter search query!" });
    }

    try {
        const mentors = await prisma.user.findMany({
            where: {
                role: Role.MENTOR,
                mentorMentorships: { none: { menteeId: menteeId } },
                mentorRequests: { none: { menteeId: menteeId } }
            },
            include: {
                interest: {
                    include: { 
                        interest: { 
                            select: { name: true } 
                        },
                    },
                },
            },
        });
        const formattedMentors = mentors.map(mentor => ({ ...mentor, interests: mentor.interest.map(i => i.interest.name), }));
        const matched = fuzzySearch(formattedMentors, query);
        res.status(200).json(matched)
    } catch(err) {
        res.status(404).json({ error: "Something went wrong while searching", details: err.message })
    }
}

module.exports = { searchMentors }