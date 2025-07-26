const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');

const app = express();

app.set('trust proxy', 1);
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({
    origin: [
        'https://mentorme-p1nv.onrender.com',
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());

let sessionConfig = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionConfig))
app.use('/auth', authRoutes);
app.use('/', mentorshipRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is connected on http://localhost:${PORT}`)
})