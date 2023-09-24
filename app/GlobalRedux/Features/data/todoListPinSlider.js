'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const todoListPinSlider = createSlice({
  name: 'todoListPin',
  initialState,
  reducers: {
    getTodoListPin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTodoListPin } = todoListPinSlider.actions;
export default todoListPinSlider.reducer;
