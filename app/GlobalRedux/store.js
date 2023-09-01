"use client";

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Features/data/tokenSlider";
import todoListUnpinReducer from "./Features/data/todoListUnPinSlider";
import todoListPinReducer from "./Features/data/todoListPinSlider";
import sidebarReducer from "./Features/toggle/sidebarSlider";
import viewModeReducer from "./Features/toggle/viewModeSlider";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    todoListUnpin: todoListUnpinReducer,
    todoListPin: todoListPinReducer,
    sidebar: sidebarReducer,
    viewMode: viewModeReducer,
  },
});
