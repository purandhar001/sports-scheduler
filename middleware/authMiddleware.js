const User = require('../models/User');

module.exports = {
  isLoggedIn: async (req, res, next) => {
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return req.session.destroy(() => {
          res.redirect('/auth/login');
        });
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.redirect('/auth/login');
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    res.status(403).send('Access Denied: Admins only.');
  },
};