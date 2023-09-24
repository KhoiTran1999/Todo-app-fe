'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const todoListUnpinSlider = createSlice({
  name: 'todoListUnpin',
  initialState,
  reducers: {
    getTodoListUnpin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTodoListUnpin } = todoListUnpinSlider.actions;
export default todoListUnpinSlider.reducer;
