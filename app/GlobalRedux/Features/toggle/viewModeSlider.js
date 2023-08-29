"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const viewModeSlider = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleviewMode: (state, action) => {
      if (action.payload) {
        state.value = action.payload;
      }
      state.value = !state.value;
    },
  },
});

export const { toggleviewMode } = viewModeSlider.actions;
export default viewModeSlider.reducer;
