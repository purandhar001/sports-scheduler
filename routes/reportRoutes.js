const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

router.use(isLoggedIn, isAdmin);

router.get('/reports', reportController.getReportsPage);

module.exports = router;