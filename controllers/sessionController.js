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

exports.joinSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.redirect('/');
    }

    if (session.playersJoined.length >= session.playersNeeded) {
        return res.redirect('/'); 
    }

    const isAlreadyJoined = session.playersJoined.some(playerId => playerId.equals(req.user._id));
    if (isAlreadyJoined) {
        return res.redirect('/'); 
    }

    session.playersJoined.push(req.user._id);
    await session.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
};

exports.getMySessionsPage = async (req, res) => {
    try {
        
        const createdSessions = await Session.find({ createdBy: req.user._id })
            .populate('sport')
            .sort({ dateTime: -1 });

        const joinedSessions = await Session.find({
            createdBy: { $ne: req.user._id }, 
            playersJoined: req.user._id       
        })
        .populate('sport')
        .populate('createdBy')
        .sort({ dateTime: 1 });
        
        res.render('sessions/my-sessions', {
            user: req.user,
            createdSessions,
            joinedSessions
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.cancelSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        const { reason } = req.body;
        console.log("Form data received:", req.body); 

        if (!session.createdBy.equals(req.user._id)) {
            return res.redirect('/'); 
        }

        session.status = 'cancelled';
        session.cancellation_reason = reason;
        await session.save();

        res.redirect('/sessions/my-sessions');
    } catch (err) {
        console.error(err);
        res.redirect('/sessions/my-sessions');
    }
};