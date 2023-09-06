"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const editLabelModalSlider = createSlice({
  name: "editLabelModal",
  initialState,
  reducers: {
    toggleEditLabelModal: (state, action) => {
      if (action.payload === false) {
        return void (state.value = action.payload);
      }
      state.value = !state.value;
    },
  },
});

export const { toggleEditLabelModal } = editLabelModalSlider.actions;
export default editLabelModalSlider.reducer;
