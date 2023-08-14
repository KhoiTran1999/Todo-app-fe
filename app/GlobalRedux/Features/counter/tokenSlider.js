"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tokenSlider = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getToken } = tokenSlider.actions;
export default tokenSlider.reducer;
