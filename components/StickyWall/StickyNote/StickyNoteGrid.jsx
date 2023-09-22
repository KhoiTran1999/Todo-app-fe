"use client";

import { Todo } from "./Todo";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import {
  SidebarSelector,
  TodoListPinSelector,
  TodoListUnpinSelector,
  TokenSelector,
} from "@/app/GlobalRedux/selector";
import { createSnapModifier, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { updateTodoAxios } from "@/service/axiosService/todoAxios";
import { usePathname } from "next/navigation";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";

function StickyNoteGrid({ isPin, todoList }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const token = useSelector(TokenSelector);
  const todoListPin = useSelector(TodoListPinSelector);
  const todoListUnpin = useSelector(TodoListUnpinSelector);
  const toggleSidebar = useSelector(SidebarSelector);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id === over?.id || !active || !over) return;

    const idList = todoList.map((val) => val.id);
    const oldIndex = todoList.findIndex((object) => object.id === active.id);
    const newIndex = todoList.findIndex((object) => object.id === over.id);

    const movedList = arrayMove(todoList, oldIndex, newIndex);

    const newTodoList = movedList.map((val, idx) => ({
      ...val,
      id: idList[idx],
    }));

    newTodoList.forEach((val) => {
      updateTodoAxios(token.accessToken, val.id, {
        title: val.title,
        content: val.content,
        pin: val.pin,
        reminder: val.reminder,
        color: val.color,
      });
    });

    if (isPin) return dispatch(getTodoList([...newTodoList, ...todoListUnpin]));
    dispatch(getTodoList([...todoListPin, ...newTodoList]));
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 500, tolerance: 10 },
  });
  const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

  const modifiers = [restrictToWindowEdges];

  return (
    <DndContext
      modifiers={modifiers}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={pathname !== "/todo/trash" && handleDragEnd}
    >
      <ul>
        <SortableContext
          items={todoList}
          strategy={horizontalListSortingStrategy}
        >
          {toggleSidebar ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                686: 1,
                804: 2,
                1060: 3,
                1292: 4,
                1536: 5,
                1780: 6,
                2036: 7,
              }}
            >
              <Masonry gutter="12px">
                {todoList.map((val, idx) => (
                  <Todo
                    key={idx}
                    id={val.id}
                    content={val.content}
                    title={val.title}
                    color={val.color}
                    pin={val.pin}
                    reminder={val.reminder}
                    archive={val.archive}
                    updatedAt={val.updatedAt}
                    deletedAt={val.deletedAt}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          ) : (
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                100: 1,
                583: 2,
                844: 3,
                1071: 4,
                1345: 5,
                1565: 6,
                1830: 7,
                2068: 8,
                2314: 9,
              }}
            >
              <Masonry gutter="12px">
                {todoList.map((val, idx) => (
                  <Todo
                    key={idx}
                    id={val.id}
                    content={val.content}
                    title={val.title}
                    color={val.color}
                    pin={val.pin}
                    reminder={val.reminder}
                    archive={val.archive}
                    updatedAt={val.updatedAt}
                    deletedAt={val.deletedAt}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </SortableContext>
      </ul>
    </DndContext>
  );
}

export default StickyNoteGrid;
