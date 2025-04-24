import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Gender {
  id: number;
  gender: string;
  created_at: string;
  updated_at: string | null;
 
  
}

interface GendersState {
  genders: Gender[];
  loading: boolean;
  error: string | null;
}

const initialState: GendersState = {
  genders: [],
  loading: false,
  error: null,
};

// Get genders
export const fetchGenders = createAsyncThunk("genders/fetch", async () => {
  const res = await api.get("/genders");
  console.log("API response:", res.data); 
  return res.data.data;
});


const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
        state.loading = false;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default gendersSlice.reducer;
