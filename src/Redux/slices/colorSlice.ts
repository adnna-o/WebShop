import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Definisanje tipova
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

// Fetch boja iz baze
export const fetchColors = createAsyncThunk("colors/fetch", async () => {
  const res = await api.get("/colors");
  console.log("API response:", res.data);
  return res.data;  
});

// Dodavanje nove boje
export const addColor = createAsyncThunk(
  'colors/addColor',
  async (color: { name: string; hex_code: string }) => {
    const response = await api.post('/colors', color);
    return response.data;
  }
);

// Reducer za boje
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching colors
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
        state.error = "Error fetching colors";
      })
      // Handle adding a new color
      .addCase(addColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.colors.push(action.payload);  // Dodavanje nove boje u listu
        state.loading = false;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error adding color";
      });
  },
});

export default colorsSlice.reducer;
