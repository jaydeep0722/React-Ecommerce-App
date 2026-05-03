// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PRODUCTS_PER_PAGE = 12;

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch products (all or by category)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, page = 1 }, { rejectWithValue }) => {
    try {
      const skip = (page - 1) * PRODUCTS_PER_PAGE;
      let url;

      if (category && category !== 'all') {
        url = `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return { products: data.products, total: data.total, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    selectedCategory: 'all',
    currentPage: 1,
    totalProducts: 0,
    productsPerPage: PRODUCTS_PER_PAGE,
    loading: false,
    categoriesLoading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.totalProducts = action.payload.total;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
      });
  },
});

export const { setCategory, setPage } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectProductsPerPage = (state) => state.products.productsPerPage;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectTotalPages = (state) =>
  Math.ceil(state.products.totalProducts / state.products.productsPerPage);

export default productsSlice.reducer;
