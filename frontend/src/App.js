import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import AdminDashboard from './components/AdminDashboard';
import QRCodeDisplay from './components/QRCodeDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Floating Background Elements */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎓 Campus Suggestion Box
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">📝 Submit Feedback</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">👨‍💼 Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/qrcode" className="nav-link">📱 QR Code</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<FeedbackForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/qrcode" element={<QRCodeDisplay />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Campus AI Suggestion Box. Powered by OpenAI & Smart Algorithms ✨</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;