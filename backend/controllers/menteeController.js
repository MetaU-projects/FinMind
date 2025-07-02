const prisma = require('../config/prismaClient');

const checkClassification = (classification) => {
    switch (classification) {
        case 'FRESHMAN':
            return ['FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR'];
        case 'SOPHOMORE':
            return ['SOPHOMORE', 'JUNIOR', 'SENIOR'];
        case 'JUNIOR': 
            return ['JUNIOR', 'SENIOR'];
        case 'SENIOR': 
            return ['SENIOR'];
    }
}

const getMentors = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const mentee = await prisma.user.findUnique({ where: { id: menteeId } });
        const allowedClasses = checkClassification(mentee.classification);
        const mentors = await prisma.user.findMany({
            where: {
                role: 'MENTOR',
                school: mentee.school,
                major: mentee.major,
                classification: { in: allowedClasses },
                mentorMentorships: { none: { menteeId: userId } },
                mentorRequests: { none: { menteeId: userId } }
            }
        });
        res.json(mentors);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No mentor found, try again later!" });
    }
}

module.exports = { getMentors };