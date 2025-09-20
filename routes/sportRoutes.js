const express = require('express');
const router = express.Router();
const sportController = require('../controllers/sportController');
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

router.use(isLoggedIn, isAdmin);

router.get('/sports', sportController.getSportsPage);

router.post('/sports', sportController.createSport);

module.exports = router;