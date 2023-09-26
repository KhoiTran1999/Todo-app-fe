'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const sidebarSlider = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      if (action.payload === false) {
        return void (state.value = action.payload);
      }
      state.value = !state.value;
    },
  },
});

export const { toggleSidebar } = sidebarSlider.actions;
export default sidebarSlider.reducer;
