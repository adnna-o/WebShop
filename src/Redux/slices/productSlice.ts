import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Tipovi za Product, sada sa detaljnijim informacijama o brandu i kategorijama.
export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  gender: number;
  color: number;
  created_at: string;
  images: string[];
  brand: Brand;
  categories: Category[];
  size: number[];
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const res = await api.get("/products");
    if (res.status === 200) {
      return res.data.data;
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error: any) {
   
    throw new Error(error?.response?.data?.message || error.message || "Error fetching products");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
       
        state.error = action.error.message || "Error fetching products";
      });
  },
});

export default productsSlice.reducer;
