const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.send({ status: 'ok' });
})

const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);

module.exports = app;