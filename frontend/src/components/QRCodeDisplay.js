import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const QRCodeDisplay = () => {
  const [qrCode, setQrCode] = useState('');
  const [feedbackUrl, setFeedbackUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/qrcode`);
      setQrCode(response.data.qrCode);
      setFeedbackUrl(response.data.url);
      setError('');
    } catch (err) {
      console.error('Error fetching QR code:', err);
      setError('Failed to generate QR code');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/qrcode/download`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'campus-feedback-qr.png');
      
      // Append to html link element page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading QR code:', err);
      alert('Failed to download QR code');
    }
  };

  return (
    <div className="qrcode-display">
      <div className="qrcode-header">
        <h1>📱 QR Code for Feedback Form</h1>
        <p>Share this QR code to allow easy access to the feedback form</p>
      </div>

      <div className="qrcode-container">
        {isLoading ? (
          <div className="loading">Generating QR code...</div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchQRCode} className="retry-btn">
              🔄 Try Again
            </button>
          </div>
        ) : (
          <div className="qrcode-content">
            <div className="qrcode-image">
              <img src={qrCode} alt="QR Code for Feedback Form" />
            </div>
            
            <div className="qrcode-info">
              <p><strong>URL:</strong> {feedbackUrl}</p>
              <p>Scan this QR code with your smartphone camera to quickly access the feedback form.</p>
            </div>

            <div className="qrcode-actions">
              <button onClick={downloadQRCode} className="download-btn">
                💾 Download QR Code
              </button>
              <button onClick={fetchQRCode} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="usage-instructions">
        <h3>📋 How to Use</h3>
        <div className="instructions-grid">
          <div className="instruction-item">
            <div className="instruction-number">1</div>
            <div className="instruction-text">
              <strong>Print or Display</strong>
              <p>Download and print the QR code or display it on screens around campus</p>
            </div>
          </div>
          <div className="instruction-item">
            <div className="instruction-number">2</div>
            <div className="instruction-text">
              <strong>Scan with Phone</strong>
              <p>Students can scan the QR code using their smartphone camera</p>
            </div>
          </div>
          <div className="instruction-item">
            <div className="instruction-number">3</div>
            <div className="instruction-text">
              <strong>Submit Feedback</strong>
              <p>The QR code will open the feedback form directly in their browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;