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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Masonry from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { TokenSelector } from "@/app/GlobalRedux/selector";
import { getTodoListPin } from "@/app/GlobalRedux/Features/data/todoListPinSlider";
import { updateTodoAxios } from "@/service/axiosService/todoAxios";
import { getTodoListUnpin } from "@/app/GlobalRedux/Features/data/todoListUnPinSlider";

function StickyNoteList({ isPin, todoList }) {
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
      updateTodoAxios(token.accessToken, val.id, {
        title: val.title,
        content: val.content,
        pin: val.pin,
        reminder: val.reminder,
        color: val.color,
      });
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
    <div className="w-full max-w-[600px] m-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <ul>
          <SortableContext
            items={todoList}
            strategy={verticalListSortingStrategy}
          >
            <Masonry columnsCount={1}>
              {[...todoList].reverse().map((val, idx) => (
                <Todo
                  key={idx}
                  id={val.id}
                  content={val.content}
                  title={val.title}
                  color={val.color}
                  pin={val.pin}
                  reminder={val.reminder}
                  updatedAt={val.updatedAt}
                />
              ))}
            </Masonry>
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
}

export default StickyNoteList;
