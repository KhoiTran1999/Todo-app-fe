'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const deletedSearchIconSlider = createSlice({
  name: 'deletedSearchIcon',
  initialState,
  reducers: {
    toggleDeletedSearchIcon: (state, action) => {
      if (action.payload === false) {
        return void (state.value = action.payload);
      }
      state.value = !state.value;
    },
  },
});

export const { toggleDeletedSearchIcon } = deletedSearchIconSlider.actions;
export default deletedSearchIconSlider.reducer;
