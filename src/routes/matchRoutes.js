const express = require('express');
const router = express.Router();
const { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } = require('../controllers/matchController');
const authMiddleware = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get all matches (paginated)
 *     tags: [Matches]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         description: Filter by team name
 *       - in: query
 *         name: tournament
 *         schema:
 *           type: string
 *         description: Filter by tournament
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by year
 *     responses:
 *       200:
 *         description: List of matches
 */
router.get('/', cacheMiddleware(60), getMatches);

/**
 * @swagger
 * /api/matches/{id}:
 *   get:
 *     summary: Get a match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Match found
 *       404:
 *         description: Match not found
 */
router.get('/:id', cacheMiddleware(120), getMatchById);

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [date, homeTeam, awayTeam, homeScore, awayScore, tournament]
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-01-15"
 *               homeTeam:
 *                 type: string
 *                 example: "Brazil"
 *               awayTeam:
 *                 type: string
 *                 example: "Argentina"
 *               homeScore:
 *                 type: integer
 *                 example: 2
 *               awayScore:
 *                 type: integer
 *                 example: 1
 *               tournament:
 *                 type: string
 *                 example: "FIFA World Cup"
 *               country:
 *                 type: string
 *                 example: "Qatar"
 *               city:
 *                 type: string
 *                 example: "Doha"
 *               neutral:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Match created
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, createMatch);

/**
 * @swagger
 * /api/matches/{id}:
 *   put:
 *     summary: Update a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Match updated
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authMiddleware, updateMatch);

/**
 * @swagger
 * /api/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Match deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authMiddleware, deleteMatch);

module.exports = router;