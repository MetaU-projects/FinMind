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
        description,
        bio,
        availability } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters long" });

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role,
                school,
                major,
                classification,
                description,
                bio,
                availability
            }
        });

        res.status(201).json({ message: "Successfully Signed Up!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong signing up" });
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

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong logging in" });
    }
}

const isLoggedIn = async (req, res) => {
    
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.userId },
            select: { email: true }
        });

        if (!req.session.userId) return res.status(401).json({ message: "Not logged In" });
        
        res.json({ id: req.session.userId, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Try logging in again!" });
    }

}

const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            res.json({ message: "bye" })
        })
        res.json({ message: "See you next time!" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Error logging out" })
    }
}

module.exports = { signup, login, isLoggedIn, logout };