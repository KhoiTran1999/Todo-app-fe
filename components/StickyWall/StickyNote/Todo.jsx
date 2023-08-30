import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { TodoListSelector, ViewModeSelector } from "@/app/GlobalRedux/selector";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  faBell,
  faPalette,
  faTag,
  faThumbTack,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

export const Todo = ({ id, title, content }) => {
  const dispatch = useDispatch();
  const viewMode = useSelector(ViewModeSelector);
  const todoList = useSelector(TodoListSelector);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges: () => false });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDeleteTodo = (e) => {
    const newTodoList = todoList.filter((val) => val.id !== id);
    dispatch(getTodoList(newTodoList));
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${
        isDragging && "z-[100]"
      } break-inside-avoid px-4 pt-2 pb-12 mb-3 ${
        viewMode ? "w-[240px]" : "w-full max-w-[600px]"
      } bg-white border border-slate-200 transition-shadow rounded-xl hover:shadow-lg cursor-default active:cursor-move relative`}
    >
      <h4 className="max-h-[100px] line-clamp-[3] text-ellipsis overflow-hidden text-lg font-semibold text-slate-700 mb-2">
        {title}
      </h4>
      <p className="max-h-[355px] line-clamp-[15] text-ellipsis overflow-hidden">
        {content}
      </p>
      <div className="opacity-0 hover:opacity-100 transition-all absolute w-full h-full top-0 left-0">
        <div className="pt-4 flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon
              icon={faPalette}
              className="w-5 h-5 text-slate-500"
            />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-slate-500" />
          </div>
          <div
            onClick={handleDeleteTodo}
            className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className="w-5 h-5 text-slate-500"
            />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
          <FontAwesomeIcon
            icon={faThumbTack}
            className="w-5 h-5 text-slate-500"
          />
        </div>
      </div>
    </li>
  );
};
