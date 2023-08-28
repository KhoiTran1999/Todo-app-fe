"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const sidebarSlider = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleSidebar } = sidebarSlider.actions;
export default sidebarSlider.reducer;
