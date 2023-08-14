"use client";

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Features/counter/tokenSlider";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});
