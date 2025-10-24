import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const departments = [
    'Computer Science',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Information Technology',
    'Chemical Engineering',
    'Biotechnology',
    'MBA',
    'BBA',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Other'
  ];

  useEffect(() => {
    setCharCount(formData.feedback.length);
  }, [formData.feedback]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.department || !formData.feedback.trim()) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSuccess(false);
      return;
    }

    if (formData.feedback.trim().length < 10) {
      setSubmitMessage('Please provide more detailed feedback (at least 10 characters).');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/feedback`, formData);
      
      setIsSuccess(true);
      setSubmitMessage(`🎉 Thank you for your feedback! It has been automatically categorized as "${response.data.feedback.category}" and submitted successfully.`);
      
      // Reset form with animation
      setTimeout(() => {
        setFormData({
          name: '',
          department: '',
          feedback: ''
        });
      }, 2000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsSuccess(false);
      setSubmitMessage('❌ Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="form-header">
        <h1>🎯 Submit Your Campus Feedback</h1>
        <p>Help us improve campus facilities by sharing your suggestions and feedback. Your voice matters! ✨</p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">👤 Name (Optional)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">🏫 Department *</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select your department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feedback">
            💭 Your Feedback * 
            <span style={{ 
              float: 'right', 
              fontSize: '0.9rem', 
              color: charCount < 10 ? '#dc3545' : '#28a745',
              fontWeight: 'normal'
            }}>
              {charCount}/500 characters
            </span>
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            rows={6}
            maxLength={500}
            placeholder="Share your suggestions about canteen, hostel, academics, infrastructure, sports, or any other campus facilities..."
            style={{
              borderColor: charCount < 10 ? '#dc3545' : charCount > 10 ? '#28a745' : '#e1e5e9'
            }}
          />
          {charCount < 10 && formData.feedback.length > 0 && (
            <small style={{ color: '#dc3545', fontSize: '0.8rem' }}>
              Please provide more detailed feedback (minimum 10 characters)
            </small>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || charCount < 10}
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? '🔄 Submitting & Categorizing...' : '📤 Submit Feedback'}
        </button>

        {submitMessage && (
          <div className={`message ${isSuccess ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}
      </form>

      <div className="ai-info">
        <h3>🤖 AI-Powered Smart Categorization</h3>
        <p>
          Your feedback will be automatically categorized using advanced AI technology 
          to help administrators address concerns more efficiently. Categories include: 
          🍽️ Canteen, 🏠 Hostel, 📚 Academics, 🏗️ Infrastructure, ⚽ Sports, and 📋 Others.
        </p>
      </div>
    </div>
  );
};

export default FeedbackForm;