import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { load, addToCart } from './productSlice.js';
import './Products.scss'
import box from '../../assets/box.png'
import Cart from '../../Components/Cart/Cart';
import { FaCartShopping } from "react-icons/fa6";

// eslint-disable-next-line react-refresh/only-export-components
export const data = [
  { id: 1, title: "Wireless Mouse", price: 25.99, count: 50, image: box },
  { id: 2, title: "Mechanical Keyboard", price: 89.99, count: 30, image: box },
  { id: 3, title: "HD Monitor 24\"", price: 149.99, count: 20, image: box },
  { id: 4, title: "USB-C Hub", price: 39.99, count: 75, image: box },
  { id: 5, title: "External SSD 1TB", price: 119.99, count: 15, image: box },
  { id: 6, title: "Bluetooth Speaker", price: 45.50, count: 40, image: box },
  { id: 7, title: "Gaming Headset", price: 69.00, count: 25, image: box },
  { id: 8, title: "Webcam Full HD", price: 55.49, count: 18, image: box },
  { id: 9, title: "Laptop Stand", price: 32.00, count: 60, image: box },
  { id: 10, title: "Smartwatch Series 7", price: 199.99, count: 10, image: box },
  { id: 11, title: "Wireless Charger", price: 28.99, count: 55, image: box },
  { id: 12, title: "Portable Projector", price: 249.00, count: 12, image: box },
  { id: 13, title: "Noise Cancelling Earbuds", price: 79.99, count: 35, image: box },
  { id: 14, title: "Tablet 10.1\"", price: 179.99, count: 22, image: box },
  { id: 15, title: "Phone Tripod", price: 18.50, count: 80, image: box },
  { id: 16, title: "Power Bank 20000mAh", price: 34.90, count: 45, image: box },
  { id: 17, title: "LED Desk Lamp", price: 22.00, count: 38, image: box },
  { id: 18, title: "Smart Light Bulb", price: 14.99, count: 100, image: box },
  { id: 19, title: "Action Camera 4K", price: 99.99, count: 16, image: box },
  { id: 20, title: "Graphic Tablet", price: 129.99, count: 14, image: box },
  { id: 21, title: "Fitness Tracker", price: 59.99, count: 28, image: box },
  { id: 22, title: "Wireless Earphones", price: 49.99, count: 33, image: box },
  { id: 23, title: "Laptop Backpack", price: 44.99, count: 27, image: box },
  { id: 24, title: "Mini Drone", price: 89.00, count: 19, image: box },
  { id: 25, title: "Ergonomic Chair", price: 199.50, count: 8, image: box },
  { id: 26, title: "Smart Thermostat", price: 149.00, count: 11, image: box },
  { id: 27, title: "VR Headset", price: 299.99, count: 9, image: box },
  { id: 28, title: "Gaming Controller", price: 64.99, count: 24, image: box },
  { id: 29, title: "Streaming Microphone", price: 89.90, count: 17, image: box },
  { id: 30, title: "Portable Bluetooth Printer", price: 134.95, count: 13, image: box }
];



const Products = () => {
  const [cartOpen, setCartOpen] = useState(false); // состояние видимости корзины

  const count = useSelector((state) => state.product.value)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.product.items);
  const visibleProducts = data.slice(0, count)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        dispatch(load());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }
  }, [cartOpen]);

  return (
    <div className='Products'>
      <button className="cart-toggle" onClick={() => setCartOpen(!cartOpen)}>
        <div className="icon-wrapper">
          <FaCartShopping />
          {cartItems.length > 0 && (
            <span className="item-count">{cartItems.length}</span>
          )}
        </div>
      </button>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <div className="container">
        <div className="Products__inner">
          {visibleProducts.map((product) => {
            const inCartCount = cartItems.filter(item => item.id === product.id).length;
            const isSoldOut = inCartCount >= product.count;

            return (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>In stock: {product.count - inCartCount}</p>
                <button 
                  onClick={() => dispatch(addToCart(product))} 
                  disabled={isSoldOut}
                >
                  {isSoldOut ? 'Out of stock' : 'To cart'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Products