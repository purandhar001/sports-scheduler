const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  venue: {
    type: String,
    required: true,
    trim: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  playersNeeded: {
    type: Number,
    required: true,
    min: 1,
  },
  playersJoined: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['active', 'cancelled', 'completed'],
    default: 'active',
  },
 
  cancellation_reason: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);