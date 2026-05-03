// src/pages/Checkout/Checkout.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../features/cart/cartSlice';
import Navbar from '../../components/Navbar/Navbar';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    alert('🎉 Order placed successfully! Thank you for shopping with LUXEstore.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-empty">
          <div className="checkout-empty__icon">🛒</div>
          <h2 className="checkout-empty__title">Your cart is empty</h2>
          <p className="checkout-empty__sub">Add some products to get started.</p>
          <button className="checkout-empty__btn" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />
      <main className="checkout-page__main">
        <div className="checkout-page__header">
          <h1 className="checkout-page__heading">
            Your <em>Cart</em>
          </h1>
          <p className="checkout-page__sub">{count} item{count !== 1 ? 's' : ''} in your bag</p>
        </div>

        <div className="checkout-layout">
          {/* Cart Items */}
          <div className="checkout-items">
            {items.map((item) => {
              const discounted = item.price * (1 - item.discountPercentage / 100);
              return (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="checkout-item__img"
                  />
                  <div className="checkout-item__info">
                    <h3 className="checkout-item__title">{item.title}</h3>
                    <div className="checkout-item__pricing">
                      <span className="checkout-item__price">${discounted.toFixed(2)}</span>
                      {item.discountPercentage > 0 && (
                        <span className="checkout-item__original">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="checkout-item__controls">
                      <div className="qty-control">
                        <button
                          className="qty-control__btn"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        >−</button>
                        <span className="qty-control__val">{item.quantity}</span>
                        <button
                          className="qty-control__btn"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        >+</button>
                      </div>
                      <span className="checkout-item__subtotal">
                        ${(discounted * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="checkout-item__remove"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2 className="checkout-summary__title">Order Summary</h2>

            <div className="checkout-summary__lines">
              <div className="checkout-summary__line">
                <span>Subtotal ({count} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="checkout-summary__line">
                <span>Shipping</span>
                <span className="checkout-summary__free">Free</span>
              </div>
              <div className="checkout-summary__line">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="checkout-summary__divider" />
              <div className="checkout-summary__line checkout-summary__line--total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-summary__order-btn" onClick={handlePlaceOrder}>
              Place Order →
            </button>

            <button className="checkout-summary__back-btn" onClick={() => navigate('/')}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
