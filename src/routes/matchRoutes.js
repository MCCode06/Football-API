const express = require('express');
const router = express.Router();
const { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } = require('../controllers/matchController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getMatches);
router.get('/:id', getMatchById);
router.post('/', authMiddleware, createMatch);
router.put('/:id', authMiddleware, updateMatch);
router.delete('/:id', authMiddleware, deleteMatch);

module.exports = router;