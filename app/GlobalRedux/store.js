"use client";

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Features/data/tokenSlider";
import sidebarReducer from "./Features/toggle/sidebarSlider";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    sidebar: sidebarReducer,
  },
});
