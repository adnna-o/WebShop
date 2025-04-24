import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Colors {
    id: number;
    name: string;
    hex_code: string; 
    created_at: string;
    updated_at: string | null;

  
}

interface ColorsState {
  colors: Colors[];
  loading: boolean;
  error: string | null;
}

const initialState: ColorsState = {
  colors: [],
  loading: false,
  error: null,
};

// Get colors
export const fetchColors = createAsyncThunk("colors/fetch", async () => {
  const res = await api.get("/colors");
  console.log("API response:", res.data); 
  return res.data;
});



const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loading = false;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default colorsSlice.reducer;
