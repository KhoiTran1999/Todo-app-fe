'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const editTodoModalSlider = createSlice({
  name: 'editTodomodal',
  initialState,
  reducers: {
    toggleEditTodoModal: (state, action) => {
      if (action.payload === false) {
        return void (state.value = action.payload);
      }
      state.value = !state.value;
    },
  },
});

export const { toggleEditTodoModal } = editTodoModalSlider.actions;
export default editTodoModalSlider.reducer;
