import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";


export interface Product {
  id: number;
  name: string;
  created_at: string;
  images: string[];
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
  "products/add",
  async (newProduct: Omit<Product, "id">) => {
    await api.post("/products", newProduct);
    const res = await api.get("/products"); 
    return res.data.data;
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
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default productsSlice.reducer;
