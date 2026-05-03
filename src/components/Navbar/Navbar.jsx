// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../../features/auth/authSlice';
import { selectCartCount } from '../../features/cart/cartSlice';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">
          <span className="navbar__logo">⬡</span>
          <span className="navbar__name">LUXE<em>store</em></span>
        </Link>
      </div>

      <div className="navbar__actions">
        {user && (
          <span className="navbar__user">
            <img src={user.image} alt={user.firstName} className="navbar__avatar" />
            <span className="navbar__username">{user.firstName}</span>
          </span>
        )}

        <Link to="/checkout" className="navbar__cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
        </Link>

        <button className="navbar__logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
