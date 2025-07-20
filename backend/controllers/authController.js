const bcrypt = require('bcrypt');
const prisma = require('../config/prismaClient');

const signup = async (req, res) => {
    const { name,
        email,
        password,
        role,
        school,
        major,
        classification,
        bio } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters long" });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role,
                school,
                major,
                classification,
                bio,
            }
        });

        res.status(201).json({ message: "Successfully Signed Up!" });

    } catch (err) {
        res.status(500).json({ error: "Something went wrong signing up" }, err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) return res.status(401).json({ error: "Invalid email or password" });

        req.session.userId = user.id;

        res.json({ message: "Login successful", user: { id: req.session.userId, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong logging in" }, err);
    }
}

const isLoggedIn = async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ message: "Not logged In" });

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.userId },
            select: { email: true, role: true }
        });

        res.json({ id: req.session.userId, email: user.email, role: user.role });
    } catch (err) {
        res.status(500).json({ error: "Try logging in again!" }, err);
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            res.clearCookie("connect.sid");
            res.json({ message: "See you next time!" })
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to log out" }, err)
    }
}

module.exports = { signup, login, isLoggedIn, logout };