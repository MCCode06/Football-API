const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.send({ status: 'ok' });
})

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

module.exports = app;