import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Get categories
export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await api.get("/categories");
  return res.data;
});

// Add category
export const addCategory = createAsyncThunk(
  "categories/add",
  async (newCategory: { name: string }, { dispatch }) => {
    const res = await api.post("/categories", newCategory);

    // Fetch categories again after adding the new category
    dispatch(fetchCategories());

    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching categories";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const newCategory = {
          id: action.payload.id,
          name: action.payload.name,
          created_at: action.payload.created_at ?? new Date().toISOString(),
          updated_at: action.payload.updated_at ?? null,
        };

        state.categories.push(newCategory);
      });
  },
});

export default categoriesSlice.reducer;
