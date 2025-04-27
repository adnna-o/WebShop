import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Sizes {
  id: number;
  size: string;
  created_at: string;
  updated_at: string | null;
}

interface SizesState {
  sizes: Sizes[];
  loading: boolean;
  error: string | null;
}

const initialState: SizesState = {
  sizes: [],
  loading: false,
  error: null,
};

// Get sizes
export const fetchSizes = createAsyncThunk("sizes/fetch", async () => {
  const res = await api.get("/sizes");
  console.log("API response:", res.data);
  return res.data;
});

// Add new size
export const addSize = createAsyncThunk(
  "sizes/add",
  async (size: string) => {
    const res = await api.post("/sizes", { size });
    console.log("Size added:", res.data);
    return res.data;
  }
);

const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.sizes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSizes.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching sizes";
      })
     
      .addCase(addSize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.sizes.push(action.payload); 
        state.loading = false;
      })
      .addCase(addSize.rejected, (state) => {
        state.loading = false;
        state.error = "Error adding size";
      });
  },
});

export default sizesSlice.reducer;
