import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Brand {
  id: number;
  name: string;

  created_at: string;
 
  updated_at: string | null;

  
}

interface BrandsState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};

// Get brands
export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  const res = await api.get("/brands");
  console.log("API response:", res.data); 
  return res.data;
});



const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default brandsSlice.reducer;
