const prisma = require('../config/prismaClient');
const { taskStatus } = require('../utils/statusEnums');

const createTask = async (req, res) => {
    const { mentorshipId, title, description, priority } = req.body;
    try {
        if ( !mentorshipId || !title || !description || !priority) return res.status(400).json({ error: "Missing required fields" });
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
        res.status(500).json({ error: "Error creating a session", details: err.message })
    }
}

const updateTask = async (req, res) => {
    const { taskId, status } = req.body;
    try {
        if ( !taskId || !status ) return res.status(400).json({ error: "Missing required fields" });
        const taskUpdate = await prisma.task.update({
            where: { id: taskId },
            data: { status }
        });
        res.status(201).json(taskUpdate);
    } catch (err) {
        res.status(404).json({ error: "Error updating connection!", details: err.message});
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
        res.status(404).json({ error: "Error getting tasks!", details: err.message});
    }
}

const activeTasks = async (req, res) => {
    const userId = req.session.userId
    try {
        const totalActiveTasks = await prisma.task.count({
            where: {
                status: {
                    in: [ taskStatus.TODO, taskStatus.IN_PROGRESS ]
                },
                mentorship: {
                    OR: [
                        { menteeId: userId },
                        { mentorId: userId }
                    ]
                }
            }
        });
        res.status(200).json(totalActiveTasks)
    } catch (err) {
        res.status(404).json({ error: "Error getting total tasks", details: err.message })
    }
}

module.exports = {
    createTask,
    updateTask,
    getTasks,
    activeTasks
}
