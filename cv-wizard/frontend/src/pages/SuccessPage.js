import React from 'react';
import { useCVContext } from '../context/CVContext';
import './SuccessPage.css';

const SuccessPage = () => {
  const { goToStep } = useCVContext();

  const handleDownload = () => {
    // In production: generate and download PDF
    alert('Your CV is being prepared for download...');
    goToStep(10); // Back to preview with download enabled
  };

  const handleDashboard = () => {
    goToStep(15); // Dashboard
  };

  return (
    <div className="success-page">
      <div className="success-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-confetti"></div>
      </div>

      <div className="success-container">
        {/* Success Icon */}
        <div className="success-icon-wrap">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="success-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
          </div>
        </div>

        <h1 className="success-title">Payment Successful! 🎉</h1>
        <p className="success-subtitle">
          Your CV Wizard Pro is now activated. Your professional CV is ready!
        </p>

        {/* Receipt */}
        <div className="receipt-card">
          <div className="receipt-header">
            <span>📄 Order Receipt</span>
            <span className="receipt-id">#CVW-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
          </div>
          <div className="receipt-body">
            <div className="receipt-row">
              <span>Product</span>
              <span>CV Wizard Pro</span>
            </div>
            <div className="receipt-row">
              <span>Amount</span>
              <span className="receipt-amount">$9.99</span>
            </div>
            <div className="receipt-row">
              <span>Status</span>
              <span className="receipt-status">✅ Paid</span>
            </div>
            <div className="receipt-row">
              <span>Date</span>
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="included-section">
          <h3>What's Included</h3>
          <div className="included-grid">
            {[
              { icon: '📥', text: 'HD PDF Download' },
              { icon: '✏️', text: 'Unlimited Edits' },
              { icon: '🎨', text: 'All 9 Templates' },
              { icon: '📧', text: 'Email Delivery' },
              { icon: '🖨️', text: 'Print Ready' },
              { icon: '🤖', text: 'AI Spell Check' },
            ].map((item, i) => (
              <div key={i} className="included-item">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="success-actions">
          <button className="btn-primary success-btn" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Download My CV
          </button>
          <button className="btn-secondary success-btn" onClick={handleDashboard}>
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
