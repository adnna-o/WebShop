import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  count: number;
}

const initialState: ExampleState = {
  count: 0,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = exampleSlice.actions;
export default exampleSlice.reducer;
