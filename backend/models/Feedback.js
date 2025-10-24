const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  feedback: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Canteen', 'Hostel', 'Academics', 'Infrastructure', 'Sports', 'Others'],
    default: 'Others'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);