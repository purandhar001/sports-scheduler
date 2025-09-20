const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middleware/authMiddleware');

router.get('/', isLoggedIn, (req, res) => {
    if (req.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/dashboard');
    }
});
  
router.get('/dashboard', isLoggedIn, (req, res) => {

    res.render('dashboard', { user: req.user });
});
  
router.get('/admin/dashboard', isLoggedIn, isAdmin, (req, res) => {

    res.render('admin-dashboard', { user: req.user });
});
  
module.exports = router;