const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');
const Session = require('../models/Session');

router.get('/', isLoggedIn, (req, res) => {
    if (req.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/dashboard');
    }
});
  

router.get('/dashboard', isLoggedIn, async (req, res) => { 
    try {
        const sessions = await Session.find({ status: 'active' })
            .populate('sport')
            .populate('createdBy')
            .sort({ dateTime: 1 });
        res.render('dashboard', { user: req.user, sessions });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});
  
router.get('/admin/dashboard', isLoggedIn, isAdmin, async (req, res) => { 
    try {
        const sessions = await Session.find({ status: 'active' }) 
            .populate('sport')
            .populate('createdBy')
            .sort({ dateTime: 1 });
        res.render('admin-dashboard', { user: req.user, sessions });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});
  
module.exports = router;