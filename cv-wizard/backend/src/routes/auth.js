const express = require('express');
const router = express.Router();

// In-memory store for OTPs (use Redis in production)
const otpStore = new Map();
const userStore = new Map();

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Store OTP with 10 min expiry
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      name
    });

    // In production: send email via nodemailer
    console.log(`OTP for ${email}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // In development, return OTP (remove in production)
      devOtp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const stored = otpStore.get(email);

    if (!stored) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP verified - create/get user
    otpStore.delete(email);

    const user = {
      id: `user_${Date.now()}`,
      email,
      name: stored.name || email.split('@')[0],
      createdAt: new Date()
    };
    userStore.set(email, user);

    // In production: create JWT token
    const token = `mock_jwt_${user.id}`;

    res.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Get user profile
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Mock user for demo
  res.json({
    user: {
      id: 'mock_user_1',
      email: 'user@example.com',
      name: 'Demo User'
    }
  });
});

module.exports = router;
