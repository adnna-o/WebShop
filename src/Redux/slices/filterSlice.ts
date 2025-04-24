import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  genders: number[];
  categories: number[];
  brands: number[];
  sizes: number[];
  colors: number[];
  min_price: number;
  max_price: number;
}

const initialState: FiltersState = {
  genders: [],
  categories: [],
  brands: [],
  sizes: [],
  colors: [],
  min_price: 0,
  max_price: 5000,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenderFilter: (state, action: PayloadAction<number[]>) => {
        state.genders = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.categories = state.categories.includes(id)
        ? state.categories.filter((catId) => catId !== id)
        : [...state.categories, id];
    },
    setBrandFilter: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.brands = state.brands.includes(id)
        ? state.brands.filter((b) => b !== id)
        : [...state.brands, id];
    },
    setSizeFilter: (state, action: PayloadAction<number[]>) => {
        const selectedSizeIds = action.payload;
        state.sizes = selectedSizeIds;
      },
    setColorFilter: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.colors = state.colors.includes(id)
        ? state.colors.filter((c) => c !== id)
        : [...state.colors, id];
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.min_price = action.payload.min;
      state.max_price = action.payload.max;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setGenderFilter,
  setCategoryFilter,
  setBrandFilter,
  setSizeFilter,
  setColorFilter,
  setPriceRange,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
