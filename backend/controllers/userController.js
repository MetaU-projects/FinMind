const prisma = require('../config/prismaClient');
const bcrypt = require('bcrypt');
const { WeekDay } = require('../src/generated/prisma');

const updateUserProfile = async (req, res) => {
    const userId = req.session.userId;
    const {
        name,
        email,
        major,
        school,
        classification,
        bio,
        interests,
        preference
    } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email }),
                ...(major !== undefined && { major }),
                ...(school !== undefined && { school }),
                ...(classification !== undefined && { classification }),
                ...(bio !== undefined && { bio }),
                ...(Array.isArray(interests) && {
                    interest: {
                        deleteMany: {},
                        create: interests.map(id => ({ interestId: id })),
                    }
                }),
                ...(Array.isArray(preference) && {
                    preference: {
                        deleteMany: {},
                        create: preference.map(({ day, startTime, endTime }) => ({
                            day: WeekDay[day],
                            startTime,
                            endTime,
                        })),
                    }
                }),
            }
        });

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update profile", details: err.message });
    }
};


const updateUserPassword = async (req, res) => {
    const userId = req.session.userId;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) return res.status(404).json({ error: "User not found." });

        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) return res.status(400).json({ error: "Current password is incorrect." });

        if (newPassword.length < 8) {
            return res.status(400).json({ error: "New password must be at least 8 characters long." });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newHashedPassword }
        });

        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        res.status(500).json({ error: "Failed to update password", details: err.message });
    }
};

module.exports = {
    updateUserProfile,
    updateUserPassword
};
