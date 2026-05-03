// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../../features/cart/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const inCart = cartItems.find((item) => item.id === product.id);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
    }));
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
        <span className="product-card__discount">-{Math.round(product.discountPercentage)}%</span>
        <div className="product-card__rating">
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          {product.rating.toFixed(1)}
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title" title={product.title}>{product.title}</h3>

        <div className="product-card__pricing">
          <span className="product-card__price">${discountedPrice.toFixed(2)}</span>
          <span className="product-card__original">${product.price.toFixed(2)}</span>
        </div>

        <button
          className={`product-card__btn ${inCart ? 'product-card__btn--added' : ''}`}
          onClick={handleAddToCart}
        >
          {inCart ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              In Cart ({inCart.quantity})
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
