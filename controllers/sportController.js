const Sport = require('../models/Sport');

exports.getSportsPage = async (req, res) => {
  try {

    const sports = await Sport.find().sort({ createdAt: -1 });
    res.render('admin/sports', {
      user: req.user,
      sports: sports 
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/dashboard');
  }
};

exports.createSport = async (req, res) => {
  const { name } = req.body;
  try {
    const sportExists = await Sport.findOne({ name });
    if (sportExists) {

      return res.redirect('/admin/sports');
    }

    await Sport.create({
      name: name,
      createdBy: req.user._id,
    });
    res.redirect('/admin/sports');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/sports');
  }
};