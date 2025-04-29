import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

interface Image {
  name: string;
  path: string;
  is_main: number;
}
interface Category {
  id: number;
}
interface Discount {
  id: number;
}
interface Size {
  id: number;
  amount: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  gender: number;
  color_id: number;
  brand_id: number;
  isFavorite: boolean;
  images: Image[];
  categories: Category[];
  discounts: Discount[];
  sizes: Size[];
  description?: string;
  created_at: string;
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
    throw new Error(
      error?.response?.data?.message ||
        error.message ||
        "Error fetching products"
    );
  }
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (formData: FormData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(fetchProducts());
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding product"
      );
    }
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

        state.error = action.error.message || "Error fetching products";
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
