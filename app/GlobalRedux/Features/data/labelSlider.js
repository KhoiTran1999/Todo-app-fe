"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const labelSlider = createSlice({
  name: "label",
  initialState,
  reducers: {
    getLabel: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getLabel } = labelSlider.actions;
export default labelSlider.reducer;
