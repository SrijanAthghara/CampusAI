import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({ totalFeedback: 0, categoryStats: [] });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['all', 'Canteen', 'Hostel', 'Academics', 'Infrastructure', 'Sports', 'Others'];

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, [selectedCategory]);

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/feedback?category=${selectedCategory}`);
      setFeedbacks(response.data.feedbacks);
      setError('');
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to fetch feedback data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/feedback/stats`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      'Canteen': '🍽️',
      'Hostel': '🏠',
      'Academics': '📚',
      'Infrastructure': '🏗️',
      'Sports': '⚽',
      'Others': '📋'
    };
    return emojiMap[category] || '📋';
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🔧 Admin Dashboard</h1>
        <p>Manage and review campus feedback submissions</p>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Feedback</h3>
            <div className="stat-number">{stats.totalFeedback}</div>
          </div>
          {stats.categoryStats.map((stat) => (
            <div key={stat._id} className="stat-card">
              <h3>{getCategoryEmoji(stat._id)} {stat._id}</h3>
              <div className="stat-number">{stat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter by Category</h3>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category === 'all' ? '📋 All' : `${getCategoryEmoji(category)} ${category}`}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="feedback-section">
        <h3>
          Feedback Submissions 
          {selectedCategory !== 'all' && (
            <span className="category-label">{getCategoryEmoji(selectedCategory)} {selectedCategory}</span>
          )}
        </h3>

        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
          <div className="loading">Loading feedback...</div>
        ) : feedbacks.length === 0 ? (
          <div className="no-feedback">
            <p>No feedback found for the selected category.</p>
          </div>
        ) : (
          <div className="feedback-list">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-card">
                <div className="feedback-header">
                  <div className="feedback-meta">
                    <span className="category-tag">
                      {getCategoryEmoji(feedback.category)} {feedback.category}
                    </span>
                    <span className="date">{formatDate(feedback.date)}</span>
                  </div>
                </div>
                
                <div className="feedback-content">
                  <div className="feedback-text">
                    <strong>Feedback:</strong>
                    <p>{feedback.feedback}</p>
                  </div>
                  
                  <div className="feedback-details">
                    <div className="detail-item">
                      <strong>Name:</strong> {feedback.name || 'Anonymous'}
                    </div>
                    <div className="detail-item">
                      <strong>Department:</strong> {feedback.department}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;