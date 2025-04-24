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

// Get category
export const fetchCategories= createAsyncThunk("categories/fetch", async () => {
  const res = await api.get("/categories");
  console.log("API response:", res.data); 
  return res.data;
});



const categoriessSlice = createSlice({
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
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default categoriessSlice.reducer;
