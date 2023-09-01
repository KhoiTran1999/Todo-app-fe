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
import { TokenSelector } from "@/app/GlobalRedux/selector";
import { getTodoListPin } from "@/app/GlobalRedux/Features/data/todoListPinSlider";
import { updateTodoAxios } from "@/service/axiosService/todoAxios";
import { getTodoListUnpin } from "@/app/GlobalRedux/Features/data/todoListUnPinSlider";

function StickyNoteGrid({ isPin, todoList }) {
  const dispatch = useDispatch();
  const token = useSelector(TokenSelector);

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
      updateTodoAxios(token.accessToken, val.id, val);
    });

    if (isPin) return dispatch(getTodoListPin(newTodoList));
    dispatch(getTodoListUnpin(newTodoList));
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
                  color={val.color}
                  pin={val.pin}
                  reminder={val.reminder}
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
