// src/components/Pagination/Pagination.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectTotalPages,
  setPage,
} from '../../features/products/productsSlice';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push('...');
    }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) {
      if (right < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePage = (page) => {
    if (page !== '...' && page !== currentPage) {
      dispatch(setPage(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__btn pagination__nav"
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {getPages().map((page, idx) => (
        <button
          key={idx}
          className={`pagination__btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'pagination__ellipsis' : ''}`}
          onClick={() => handlePage(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__btn pagination__nav"
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
