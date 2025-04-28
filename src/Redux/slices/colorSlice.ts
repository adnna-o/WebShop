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

export const fetchColors = createAsyncThunk("colors/fetch", async () => {
  const res = await api.get("/colors");
  return res.data;
});

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (
    color: { name: string; hex_code: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post("/colors", color);

      dispatch(fetchColors());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding color"
      );
    }
  }
);

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
      .addCase(fetchColors.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching colors";
      })

      .addCase(addColor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default colorsSlice.reducer;
