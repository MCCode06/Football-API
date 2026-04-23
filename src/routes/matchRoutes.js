const express = require('express');
const router = express.Router();
const { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } = require('../controllers/matchController');
const authMiddleware = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.get('/', cacheMiddleware(60), getMatches);        
router.get('/:id', cacheMiddleware(60), getMatchById);  
router.post('/', authMiddleware, createMatch);
router.put('/:id', authMiddleware, updateMatch);
router.delete('/:id', authMiddleware, deleteMatch);

module.exports = router;