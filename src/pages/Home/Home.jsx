// src/pages/Home/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectSelectedCategory,
  selectCurrentPage,
} from '../../features/products/productsSlice';
import Navbar from '../../components/Navbar/Navbar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import './Home.css';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__img skeleton-anim" />
    <div className="skeleton-card__body">
      <div className="skeleton-card__line skeleton-anim" style={{ width: '40%', height: 10 }} />
      <div className="skeleton-card__line skeleton-anim" style={{ width: '80%', height: 14 }} />
      <div className="skeleton-card__line skeleton-anim" style={{ width: '60%', height: 14 }} />
      <div className="skeleton-card__line skeleton-anim" style={{ width: '50%', height: 12 }} />
    </div>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const selectedCategory = useSelector(selectSelectedCategory);
  const currentPage = useSelector(selectCurrentPage);

  // Fetch categories once on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products when category or page changes
  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, page: currentPage }));
  }, [dispatch, selectedCategory, currentPage]);

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-page__main">
        <div className="home-page__header">
          <h1 className="home-page__heading">
            Our <em>Collection</em>
          </h1>
          <p className="home-page__sub">Discover premium products curated just for you</p>
        </div>

        <CategoryFilter />

        {error && (
          <div className="home-page__error">
            <span>⚠ {error}</span>
          </div>
        )}

        <div className="products-grid">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!loading && products.length === 0 && !error && (
          <div className="home-page__empty">No products found.</div>
        )}

        <Pagination />
      </main>
    </div>
  );
};

export default Home;
