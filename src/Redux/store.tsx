import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productSlice";
import brandsReducer from "./slices/brandSlice";
import categoriesReducer from "./slices/categorySlice";
import colorsReducer from "./slices/colorSlice";
import sizesReducer from "./slices/sizeSlice";
import discountsReducer from "./slices/discountSlice";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import filtersReducer from './slices/filterSlice';




export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer, 
    brands:brandsReducer,
    categories:categoriesReducer,
    colors:colorsReducer,
    sizes:sizesReducer,
    discounts:discountsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


