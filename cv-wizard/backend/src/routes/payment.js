const express = require('express');
const router = express.Router();

// In-memory payment store
const paymentStore = new Map();

// Create payment intent (mock Stripe)
router.post('/create-intent', async (req, res) => {
  try {
    const { amount = 999, currency = 'usd' } = req.body;

    // In production: use stripe.paymentIntents.create()
    const paymentIntent = {
      id: `pi_mock_${Date.now()}`,
      amount,
      currency,
      status: 'requires_payment_method',
      clientSecret: `pi_mock_secret_${Date.now()}`
    };

    res.json({
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Process payment (mock)
router.post('/process', async (req, res) => {
  try {
    const { paymentIntentId, paymentMethod, userId, cvId } = req.body;

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 500));

    const payment = {
      id: `pay_${Date.now()}`,
      paymentIntentId,
      userId,
      cvId,
      amount: 999,
      currency: 'usd',
      status: 'succeeded',
      receiptId: `RCT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      processedAt: new Date()
    };

    paymentStore.set(payment.id, payment);

    res.json({
      success: true,
      payment,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Verify payment
router.get('/verify/:paymentId', (req, res) => {
  const payment = paymentStore.get(req.params.paymentId);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  res.json({
    success: true,
    payment,
    isPaid: payment.status === 'succeeded'
  });
});

// Webhook (for Stripe in production)
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // In production: verify Stripe webhook signature
  // const sig = req.headers['stripe-signature'];
  // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

  res.json({ received: true });
});

module.exports = router;
