'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const todoFormSlider = createSlice({
  name: 'todoForm',
  initialState,
  reducers: {
    getTodoForm: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTodoForm } = todoFormSlider.actions;
export default todoFormSlider.reducer;
