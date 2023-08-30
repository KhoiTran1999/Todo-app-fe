"use client";

import { Todo } from "./Todo";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { TodoListSelector } from "@/app/GlobalRedux/selector";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";

function StickyNoteGrid() {
  const dispatch = useDispatch();
  const todoList = useSelector(TodoListSelector);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id === over?.id || !active || !over) return;

    const activeIndex = todoList.findIndex((object) => object.id === active.id);
    const overIndex = todoList.findIndex((object) => object.id === over.id);
    const newTodoList = arrayMove(todoList, activeIndex, overIndex);
    dispatch(getTodoList(newTodoList));
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ul>
        <SortableContext
          items={todoList}
          strategy={horizontalListSortingStrategy}
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              686: 1,
              804: 2,
              1045: 3,
              1292: 4,
              1536: 5,
              1780: 6,
              2036: 7,
            }}
          >
            <Masonry>
              {[...todoList].reverse().map((val, idx) => (
                <Todo
                  key={idx}
                  id={val.id}
                  content={val.content}
                  title={val.title}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </SortableContext>
      </ul>
    </DndContext>
  );
}

export default StickyNoteGrid;
