const prisma = require('../config/prismaClient');

const classes = (classification) => {
    if (classification == 'FRESHMAN') return ['FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR'];
    else if (classification == 'SOPHOMORE') return ['SOPHOMORE', 'JUNIOR', 'SENIOR'];
    else if (classification == 'JUNIOR') return ['JUNIOR', 'SENIOR'];
    else if (classification == 'SENIOR') return ['SENIOR'];
}

const getMentors = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const mentee = await prisma.user.findUnique({ where: { id: menteeId } });
        const allowedClases = classes(mentee.classification);
        const mentors = await prisma.user.findMany({
            where: {
                role: 'MENTOR',
                school: mentee.school,
                major: mentee.major,
                classification: { in: allowedClases },
                mentorMentorships: { none: { menteeId: userId } },
                mentorRequests: { none: { menteeId: userId } }
            }
        });
        res.json(mentors);
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: "No mentor found, try again later!" });
    }
}

module.exports = { getMentors };