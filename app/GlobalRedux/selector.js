import { createSelector } from "@reduxjs/toolkit";

const TokenSelector = (state) => state.token.value;
const SidebarSelector = (state) => state.sidebar.value;
const ViewModeSelector = (state) => state.viewMode.value;

export { TokenSelector, SidebarSelector, ViewModeSelector };
