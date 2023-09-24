'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 10,
};

export const limitSlider = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    getLimit: (state, action) => {
      if (action.payload) {
        return void (state.value = action.payload);
      }
      state.value = state.value + 10;
    },
  },
});

export const { getLimit } = limitSlider.actions;
export default limitSlider.reducer;
