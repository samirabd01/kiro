import React, { useState } from 'react';
import { useCVContext } from '../context/CVContext';
import './Payment.css';

const Payment = () => {
  const { nextStep, prevStep } = useCVContext();
  const [payMethod, setPayMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').slice(0, 16)
      .replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 2) {
      return clean.slice(0, 2) + '/' + clean.slice(2);
    }
    return clean;
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep(); // Success
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="auth-bg">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>

      <div className="payment-container">
        <button className="auth-back" onClick={prevStep}>
          ← Back
        </button>

        <div className="payment-layout">
          {/* Left: Payment */}
          <div className="payment-card">
            <h2 className="payment-title">Complete Your Purchase</h2>
            <p className="payment-subtitle">Unlock unlimited downloads and premium features</p>

            {/* Payment Methods */}
            <div className="pay-methods">
              <button
                className={`pay-method ${payMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPayMethod('card')}
              >
                <span>💳</span> Credit Card
              </button>
              <button
                className={`pay-method ${payMethod === 'google' ? 'active' : ''}`}
                onClick={() => setPayMethod('google')}
              >
                <span>G</span> Google Pay
              </button>
              <button
                className={`pay-method ${payMethod === 'apple' ? 'active' : ''}`}
                onClick={() => setPayMethod('apple')}
              >
                <span>🍎</span> Apple Pay
              </button>
            </div>

            {/* Card Form */}
            {payMethod === 'card' && (
              <div className="card-form">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="4242 4242 4242 4242"
                    value={cardForm.number}
                    onChange={e => setCardForm(p => ({...p, number: formatCardNumber(e.target.value)}))}
                    maxLength={19}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={cardForm.name}
                    onChange={e => setCardForm(p => ({...p, name: e.target.value}))}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={e => setCardForm(p => ({...p, expiry: formatExpiry(e.target.value)}))}
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="123"
                      value={cardForm.cvv}
                      onChange={e => setCardForm(p => ({...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4)}))}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Google/Apple Pay */}
            {(payMethod === 'google' || payMethod === 'apple') && (
              <div className="wallet-pay">
                <div className="wallet-info">
                  <span style={{ fontSize: 48 }}>{payMethod === 'google' ? '🟡' : '⚫'}</span>
                  <p>Click "Pay Now" to complete with {payMethod === 'google' ? 'Google' : 'Apple'} Pay</p>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              className="btn-primary full-width pay-btn"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                <><div className="loading-spinner"></div> Processing payment...</>
              ) : (
                '🔒 Pay Now — $9.99'
              )}
            </button>

            <div className="payment-security">
              <span>🔐</span>
              <span>Secured by SSL • 256-bit encryption</span>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="order-item">
              <div className="order-item-info">
                <span className="order-item-icon">📄</span>
                <div>
                  <p className="order-item-name">CV Wizard Pro</p>
                  <p className="order-item-desc">1 Professional CV Download</p>
                </div>
              </div>
              <span className="order-price">$9.99</span>
            </div>

            <div className="order-divider"></div>

            <div className="order-features">
              {[
                '✅ HD PDF Download',
                '✅ Unlimited Edits',
                '✅ All 9 Templates',
                '✅ Email Delivery',
                '✅ Print Ready',
                '✅ AI Spell Check'
              ].map((f, i) => (
                <div key={i} className="feature-row">{f}</div>
              ))}
            </div>

            <div className="order-divider"></div>

            <div className="order-total">
              <span>Total</span>
              <span className="total-price">$9.99</span>
            </div>

            <div className="money-back">
              <span>💯</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
