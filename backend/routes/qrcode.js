const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// GET /api/qrcode - Generate QR code for feedback form
router.get('/', async (req, res) => {
  try {
    // URL to the feedback form (adjust based on your frontend deployment)
    const feedbackFormURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // Generate QR code as base64 data URL
    const qrCodeDataURL = await QRCode.toDataURL(feedbackFormURL, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    });

    res.json({
      qrCode: qrCodeDataURL,
      url: feedbackFormURL,
      message: 'QR Code generated successfully'
    });

  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// GET /api/qrcode/download - Download QR code as PNG
router.get('/download', async (req, res) => {
  try {
    const feedbackFormURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // Generate QR code as PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(feedbackFormURL, {
      errorCorrectionLevel: 'M',
      type: 'png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 512
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="campus-feedback-qr.png"');
    res.send(qrCodeBuffer);

  } catch (error) {
    console.error('Error downloading QR code:', error);
    res.status(500).json({ error: 'Failed to download QR code' });
  }
});

module.exports = router;