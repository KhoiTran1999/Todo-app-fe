import { createSelector } from "@reduxjs/toolkit";

const TokenSelector = (state) => state.token.value;
const SidebarSelector = (state) => state.sidebar.value;

export { TokenSelector, SidebarSelector };
