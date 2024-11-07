// src/app/payment/page.js
'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Test Payment Page</h2>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Pay $5.00'}
      </button>
    </div>
  );
}
