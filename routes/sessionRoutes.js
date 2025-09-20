const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { isLoggedIn } = require('../middleware/authMiddleware');


router.use(isLoggedIn);


router.get('/new', sessionController.getNewSessionPage);
router.post('/', sessionController.createSession);
router.post('/:id/join', sessionController.joinSession);
router.get('/my-sessions', sessionController.getMySessionsPage);
router.post('/:id/cancel', sessionController.cancelSession);


module.exports = router;