import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../pages/Products/productSlice'; // Adjust the path if needed
import { useState } from 'react';
import './Payments.scss'; // Optional for styling
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.product.items);
  const [isPaid, setIsPaid] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const navigate = useNavigate()

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment delay
    setTimeout(() => {
      setIsPaid(true);
      dispatch(clearCart());
      setIsProcessing(false);

      setTimeout(() => {
        setIsReloading(true)

        setTimeout(() => {
          navigate('/')
        }, 1000)
      }, 1000)
    }, 1500);
  };

  if (isReloading) {
    return (
      <div className="payment-reloading">
        <h2>🔄 Reloading...</h2>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="payment-success">
        <h2>✅ Payment Successful</h2>
        <p>Thank you for your purchase!</p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Checkout</h2>
      <p>Total items: {cartItems.length}</p>
      <p>Total price: ${totalPrice}</p>
      <button onClick={handlePayment} disabled={cartItems.length === 0 || isProcessing}>
        {isProcessing ? 'Processing...' : cartItems.length > 0 ? 'Pay Now' : 'Cart is Empty'}
      </button>
    </div>
  );
};

export default Payments;
