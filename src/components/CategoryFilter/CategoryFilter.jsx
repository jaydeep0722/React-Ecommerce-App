// src/components/CategoryFilter/CategoryFilter.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectSelectedCategory,
  setCategory,
} from '../../features/products/productsSlice';
import './CategoryFilter.css';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const selected = useSelector(selectSelectedCategory);

  const handleSelect = (cat) => {
    dispatch(setCategory(cat));
  };

  const formatLabel = (slug) => {
    if (typeof slug === 'object') return slug.name || slug.slug || 'Unknown';
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getCategorySlug = (cat) => {
    if (typeof cat === 'object') return cat.slug || cat.name;
    return cat;
  };

  return (
    <div className="category-filter">
      <div className="category-filter__scroll">
        <button
          className={`category-filter__btn ${selected === 'all' ? 'active' : ''}`}
          onClick={() => handleSelect('all')}
        >
          All Products
        </button>
        {categories.map((cat) => {
          const slug = getCategorySlug(cat);
          return (
            <button
              key={slug}
              className={`category-filter__btn ${selected === slug ? 'active' : ''}`}
              onClick={() => handleSelect(slug)}
            >
              {formatLabel(cat)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
