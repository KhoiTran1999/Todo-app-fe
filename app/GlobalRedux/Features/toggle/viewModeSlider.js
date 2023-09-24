'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const viewModeSlider = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleviewMode: (state, action) => {
      state.value = !state.value;
    },
  },
});

export const { toggleviewMode } = viewModeSlider.actions;
export default viewModeSlider.reducer;
