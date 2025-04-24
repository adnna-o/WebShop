import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  images:string[];
  gender: number; 
  color_id: number;  
  brand_id: number;  
  total_ratings: number;
  avg_rating: string;
  isFavorite: number;
  updated_at: string | null;
  brand: {
    id: number;
    name: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  
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

// Get products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await api.get("/products");
  console.log("API response:", res.data); 
  return res.data.data;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct: Product) => {
    const res = await api.post("/products", newProduct);
    return res.data.data; // Vraća novi proizvod
  }
);

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
        state.error = "Error";
      });
  },
});

export default productsSlice.reducer;
