"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const todoListSlider = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    getTodoList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTodoList } = todoListSlider.actions;
export default todoListSlider.reducer;
