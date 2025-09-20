const Session = require('../models/Session');
const Sport = require('../models/Sport');

exports.getNewSessionPage = async (req, res) => {
  try {

    const sports = await Sport.find();
    res.render('sessions/new', {
      user: req.user,
      sports: sports
    });
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
};

exports.createSession = async (req, res) => {
  try {
    const { sport, venue, dateTime, playersNeeded } = req.body;
    
    await Session.create({
      sport,
      venue,
      dateTime,
      playersNeeded,
      createdBy: req.user._id,
      playersJoined: [req.user._id]
    });

    res.redirect('/'); 
  } catch (err) {
    console.error(err);
    res.redirect('/sessions/new');
  }
};