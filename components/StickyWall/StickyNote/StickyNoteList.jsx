'use client';

import { Todo } from './Todo';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Masonry from 'react-responsive-masonry';
import { useDispatch, useSelector } from 'react-redux';
import {
  TodoListPinSelector,
  TodoListUnpinSelector,
  TokenSelector,
} from '@/app/GlobalRedux/selector';
import { updateTodoAxios } from '@/service/axiosService/todoAxios';
import { usePathname } from 'next/navigation';
import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';

function StickyNoteList({ isPin, todoList }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const token = useSelector(TokenSelector);
  const todoListPin = useSelector(TodoListPinSelector);
  const todoListUnpin = useSelector(TodoListUnpinSelector);

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
  const sensors = useSensors(mouseSensor, keyboardSensor);

  return (
    <div className="w-full max-w-[600px] m-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={pathname !== '/todo/trash' && handleDragEnd}
      >
        <ul>
          <SortableContext
            items={todoList}
            strategy={verticalListSortingStrategy}
          >
            <Masonry columnsCount={1}>
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
          </SortableContext>
        </ul>
      </DndContext>
    </div>
  );
}

export default StickyNoteList;
