"use client";

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Features/data/tokenSlider";
import sidebarReducer from "./Features/toggle/sidebarSlider";
import viewModeReducer from "./Features/toggle/viewModeSlider";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    sidebar: sidebarReducer,
    viewMode: viewModeReducer,
  },
});
