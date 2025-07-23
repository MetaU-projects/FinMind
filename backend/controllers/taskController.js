const prisma = require('../config/prismaClient');


const createTask = async (req, res) => {
    const { mentorshipId, title, description, priority } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                mentorshipId,
                title,
                description,
                priority
            }
        })
        res.status(201).json(task)
    } catch (err) {
        res.status(500).json({ error: "Error creating a session" }, err)
    }
}

const updateTask = async (req, res) => {
    const { taskId, status } = req.body;
    try {
        const taskUpdate = await prisma.task.update({
            where: { id: taskId },
            data: { status }
        });
        res.status(201).json(taskUpdate);
    } catch (err) {
        res.status(404).json({ error: "Error updating connection!" }, err);
    }
}

const getTasks = async (req, res) => {
    const mentorshipId = parseInt(req.params.mentorshipId);

    if (Number.isNaN(mentorshipId)) {
        return res.status(400).json({ error: "Mentorship Id is not a number" });
    }
    try {
        const tasks = await prisma.task.findMany({
            where: { mentorshipId },
        })
        res.status(200).json(tasks);
    } catch(err) {
        res.status(404).json({ error: "Error getting tasks!" }, err);
    }
}

module.exports = {
    createTask,
    updateTask,
    getTasks
}
