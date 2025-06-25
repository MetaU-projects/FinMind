const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is connected on http://localhost:${PORT}`)
})