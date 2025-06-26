const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

let sessionConfig = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionConfig))
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is connected on http://localhost:${PORT}`)
})