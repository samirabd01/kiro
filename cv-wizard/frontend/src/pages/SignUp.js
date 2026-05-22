import React, { useState } from 'react';
import { useCVContext } from '../context/CVContext';
import './SignUp.css';

const SignUp = () => {
  const { nextStep, prevStep, setUser } = useCVContext();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (method) => {
    if (method === 'email' && (!email || !name)) return;

    setLoading(true);
    // Simulate sign up
    setTimeout(() => {
      setUser({ email: email || 'user@example.com', name: name || 'User' });
      setLoading(false);
      nextStep(); // Go to Login/OTP
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>

      <div className="auth-container">
        {/* Back button */}
        <button className="auth-back" onClick={prevStep}>
          ← Back to Preview
        </button>

        <div className="auth-card">
          <div className="auth-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">
            Sign up to download and save your professional CV
          </p>

          {/* Social Buttons */}
          <div className="social-buttons">
            <button className="social-btn google-btn" onClick={() => handleSignUp('google')}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button className="social-btn facebook-btn" onClick={() => handleSignUp('facebook')}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="auth-divider">
            <span>or sign up with email</span>
          </div>

          {/* Email Form */}
          <div className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn-primary full-width"
              onClick={() => handleSignUp('email')}
              disabled={loading || !email || !name}
              style={{ opacity: loading || !email || !name ? 0.6 : 1 }}
            >
              {loading ? (
                <><div className="loading-spinner"></div> Processing...</>
              ) : (
                'Sign Up & Continue →'
              )}
            </button>
          </div>

          <p className="auth-terms">
            By continuing, you agree to our{' '}
            <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
