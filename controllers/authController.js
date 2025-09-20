const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getRegister = (req, res) => res.render('register');
exports.getLogin = (req, res) => res.render('login');

exports.postRegister = async (req, res) => {

  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render('register', { error: 'Email already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ 
        name, 
        email, 
        password: hashedPassword, 
        role: role 
    });

    await newUser.save();
    
    console.log(`New user created: ${newUser.email} with role: ${newUser.role}`);

    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Something went wrong.' });
  }
};


exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};