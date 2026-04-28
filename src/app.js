const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const passport = require('./config/passport');
const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get('/health', (req, res) => {
    res.send({ status: 'ok' });
})

const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;