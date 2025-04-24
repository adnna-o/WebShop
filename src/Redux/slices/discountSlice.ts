import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export interface Discount {
    id: number;
    name: string;
    discount: string;
    valid_from: string;
    valid_to: string;

}

interface DiscountState {
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  loading: false,
  error: null,
};

// Get category
export const fetchDiscounts= createAsyncThunk("discounts/fetch", async () => {
  const res = await api.get("/discounts");
  console.log("API response:", res.data); 
  return res.data.data;
});



const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error";
      });
  },
});

export default discountsSlice.reducer;
