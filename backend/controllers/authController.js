const express = require('express');
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
        
        const user = await prisma.user.findUnique({ where: {email} });
        if(!user) return res.status(401).json({ error: "Invalid email or password" });

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if(!isValidPassword) return res.status(401).json({ error: "Invalid email or password" });

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong logging in" });
    }
}

module.exports = {signup, login};