const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  getFeedbackStats
} = require('../controllers/feedbackController');

// POST /api/feedback - Submit new feedback
router.post('/', submitFeedback);

// GET /api/feedback - Get all feedback (admin)
router.get('/', getAllFeedback);

// GET /api/feedback/stats - Get feedback statistics
router.get('/stats', getFeedbackStats);

module.exports = router;