import { createSelector } from "@reduxjs/toolkit";

const TokenSelector = (state) => state.token.value;
const TodoListSelector = (state) => state.todoList.value;
const SidebarSelector = (state) => state.sidebar.value;
const ViewModeSelector = (state) => state.viewMode.value;

export { TokenSelector, SidebarSelector, ViewModeSelector, TodoListSelector };
