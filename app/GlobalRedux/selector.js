import { createSelector } from '@reduxjs/toolkit';

const TokenSelector = (state) => state.token.value;
const LabelSelector = (state) => state.label.value;
const TodoListSelector = (state) => state.todoList.value;

const TodoListUnpinSelector = createSelector(
  TodoListSelector,
  (state) => state.todoListUnpin.value,
  (TodoListSelector, state) => {
    if (state.length > 0) return state;
    return TodoListSelector.filter((val) => val.pin === false);
  },
);

const TodoListPinSelector = createSelector(
  TodoListSelector,
  (state) => state.todoListPin.value,
  (TodoListSelector, state) => {
    if (state.length > 0) return state;
    return TodoListSelector.filter((val) => val.pin === true);
  },
);

const SidebarSelector = (state) => state.sidebar.value;
const ViewModeSelector = (state) => state.viewMode.value;
const EditLabelModalSelector = (state) => state.editLabelModal.value;
const EditTodoModalSelector = (state) => state.editTodoModal.value;
const TodoFormSelector = (state) => state.todoForm.value;
const LimitSelector = (state) => state.limit.value;

export {
  TokenSelector,
  LabelSelector,
  SidebarSelector,
  ViewModeSelector,
  EditLabelModalSelector,
  EditTodoModalSelector,
  TodoListSelector,
  TodoListUnpinSelector,
  TodoListPinSelector,
  TodoFormSelector,
  LimitSelector,
};
