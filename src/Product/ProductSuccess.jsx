import React, { useEffect } from 'react';
import useCartStore from '../Store/CartStore';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart(); // Clear cart on success page load
      }, []);
      
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your order.</p>
      <Link to="/">
        <button style={{ padding: 10, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 5 }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;