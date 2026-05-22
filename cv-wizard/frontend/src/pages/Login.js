import React, { useState, useRef, useEffect } from 'react';
import { useCVContext } from '../context/CVContext';
import './Login.css';

const Login = () => {
  const { nextStep, prevStep, user, setIsAuthenticated } = useCVContext();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto submit when all filled
    if (newOtp.every(v => v) && newOtp.join('').length === 4) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (code) => {
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
      nextStep(); // Go to Payment
    }, 1200);
  };

  const handleResend = () => {
    setResending(true);
    setCountdown(60);
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
    setTimeout(() => setResending(false), 1000);
  };

  const email = user?.email || 'your email';

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>

      <div className="auth-container">
        <button className="auth-back" onClick={prevStep}>
          ← Back
        </button>

        <div className="auth-card">
          <div className="otp-icon">
            <span>📧</span>
          </div>

          <h1 className="auth-title">Check Your Email</h1>
          <p className="auth-subtitle">
            We sent a 4-digit verification code to<br />
            <strong style={{ color: '#a78bfa' }}>{email}</strong>
          </p>

          {/* OTP Inputs */}
          <div className="otp-inputs">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="text"
                inputMode="numeric"
                className={`otp-input ${digit ? 'filled' : ''}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          {loading && (
            <div className="otp-verifying">
              <div className="loading-spinner"></div>
              <span>Verifying...</span>
            </div>
          )}

          <button
            className="btn-primary full-width"
            onClick={() => handleVerify(otp.join(''))}
            disabled={otp.some(v => !v) || loading}
            style={{ opacity: otp.some(v => !v) ? 0.5 : 1, marginTop: 16 }}
          >
            Verify & Login →
          </button>

          {/* Resend */}
          <div className="resend-row">
            <span>Didn't receive the code?</span>
            {countdown > 0 ? (
              <span className="countdown">Resend in {countdown}s</span>
            ) : (
              <button
                className="resend-btn"
                onClick={handleResend}
                disabled={resending}
              >
                {resending ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
