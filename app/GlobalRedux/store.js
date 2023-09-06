"use client";

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Features/data/tokenSlider";
import labelReducer from "./Features/data/labelSlider";
import todoListReducer from "./Features/data/todoListSlider";
import todoListUnpinReducer from "./Features/data/todoListUnPinSlider";
import todoListPinReducer from "./Features/data/todoListPinSlider";
import sidebarReducer from "./Features/toggle/sidebarSlider";
import viewModeReducer from "./Features/toggle/viewModeSlider";
import EditLabelModalReducer from "./Features/toggle/editLabelModalSlider";
import EditTodoModalReducer from "./Features/toggle/editTodoModalSlider";
import TodoFormReducer from "./Features/data/todoFormSlider";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    label: labelReducer,
    todoList: todoListReducer,
    todoListUnpin: todoListUnpinReducer,
    todoListPin: todoListPinReducer,
    sidebar: sidebarReducer,
    viewMode: viewModeReducer,
    editLabelModal: EditLabelModalReducer,
    editTodoModal: EditTodoModalReducer,
    todoForm: TodoFormReducer,
  },
});
