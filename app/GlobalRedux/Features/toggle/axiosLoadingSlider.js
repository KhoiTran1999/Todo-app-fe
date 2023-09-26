'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const axiosLoadingSlider = createSlice({
  name: 'axiosLoading',
  initialState,
  reducers: {
    toggleAxiosLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleAxiosLoading } = axiosLoadingSlider.actions;
export default axiosLoadingSlider.reducer;
