import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../pages/Products/productSlice';
import './Cart.scss'

export const Cart = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.product.items);
  const dispatch = useDispatch()

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity += 1;
    }
    return acc;
  }, {});

  const itemsArray = Object.values(groupedItems);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  if (cartItems.length === 0) {
    return (
      <div className="Cart">
        <button className="close-btn" onClick={onClose}>×</button>
        <p>Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div className='Cart'>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="container">
        <h2>Your cart [{cartItems.length}]</h2>
        {cartItems.length > 0 && <button className='clear-cart' onClick={() => dispatch(clearCart())}>Clear cart</button>}
        <ul>
          {itemsArray.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="item-info">
                {item.title} — ${item.price.toFixed(2)}
                {item.quantity > 1 && <span className="quantity">({item.quantity} pcs)</span>}
              </div>
              <button onClick={() => dispatch(removeFromCart(item))}>X</button>
            </li>
          ))}
          <p>total price: ${totalPrice.toFixed(2)}</p>
        </ul>
      </div>
    </div>
  );
}

export default Cart