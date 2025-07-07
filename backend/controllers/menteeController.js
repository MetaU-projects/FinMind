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
                mentorMentorships: { none: { menteeId: menteeId } },
                mentorRequests: { none: { menteeId: menteeId } }
            }
        });
        res.json(mentors);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No mentor found, try again later!" });
    }
}

const pendingRequests = async (req, res) => {
    const menteeId = req.session.userId;
    try {
        const pending = await prisma.request.findMany({
            where: { menteeId, status: "PENDING" },
            include: { mentor: true }
        })
        res.status(201).json(pending);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "No pending requests" });
    }
}

const removeRequest = async (req, res) => {
    const requestId = parseInt(req.params.requestId);
    try {
        await prisma.request.delete({
            where: { id: requestId }
        });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Failure removing request" });
    }
}

module.exports = { getMentors, pendingRequests, removeRequest };