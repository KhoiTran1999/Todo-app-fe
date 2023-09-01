import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import {
  TodoListSelector,
  TokenSelector,
  ViewModeSelector,
} from "@/app/GlobalRedux/selector";
import { useClickOutsideTodo } from "@/hooks/useClickOutsideTodo";
import {
  deleteTodoAxios,
  updateTodoAxios,
} from "@/service/axiosService/todoAxios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  faBell,
  faDropletSlash,
  faPalette,
  faTag,
  faThumbTack,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const colorList = [
  "#FAAFA8",
  "#F39F76",
  "#FFF8B8",
  "#E2F6D3",
  "#B4DDD3",
  "#D4E4ED",
  "#AECCDC",
  "#D3BFDB",
  "#F6E2DD",
  "#E9E3D4",
  "#EFEFF1",
];

export const Todo = ({ id, title, content, color, pin, reminder }) => {
  const dispatch = useDispatch();

  const viewMode = useSelector(ViewModeSelector);
  const todoList = useSelector(TodoListSelector);
  const token = useSelector(TokenSelector);

  const [colorToggle, setColorToggle] = useState(false);

  const colorRef = useRef();
  useClickOutsideTodo(colorRef, setColorToggle);

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
    deleteTodoAxios(token.accessToken, id).then((res) => {
      const newTodoList = todoList.filter((val) => val.id !== id);
      dispatch(getTodoList(newTodoList));
    });
  };

  const handleColorToggle = () => {
    setColorToggle((prev) => !prev);
  };

  const handleChangeColor = (e, elementColor) => {
    const newTodoList = todoList.map((val) => {
      if (val.id === id) {
        const newTodo = { ...val, color: elementColor };
        return newTodo;
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));

    updateTodoAxios(token.accessToken, id, {
      title,
      content,
      color: elementColor,
      pin,
      reminder,
    });
  };

  return (
    <li
      ref={setNodeRef}
      style={{ ...style, backgroundColor: color }}
      {...attributes}
      {...listeners}
      className={`${
        isDragging && "z-[100]"
      } break-inside-avoid px-4 pt-2 pb-12 mb-3 ${
        viewMode ? "w-[240px]" : "w-full max-w-[600px]"
      } bg-white  border border-slate-200 transition-shadow rounded-xl hover:shadow-lg cursor-default active:cursor-move relative`}
    >
      <h4 className="max-h-[100px] line-clamp-[3] text-ellipsis overflow-hidden text-lg font-semibold text-slate-700 mb-2">
        {title}
      </h4>
      <p className="max-h-[355px] line-clamp-[15] text-ellipsis overflow-hidden">
        {content}
      </p>

      <div
        className={`opacity-0 hover:opacity-100 ${
          colorToggle && "opacity-100"
        } transition-all absolute w-full h-full top-0 left-0`}
      >
        <div className="pt-4 flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-slate-500" />
          </div>
          <div
            ref={colorRef}
            onClick={handleColorToggle}
            className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
          >
            <FontAwesomeIcon
              icon={faPalette}
              className="w-5 h-5 text-slate-500"
            />
            {colorToggle && (
              <div className="bg-white p-2 shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-lg absolute -bottom-[52px] ">
                <div className="flex justify-center items-center">
                  <div
                    onClick={(e) => handleChangeColor(e, "white")}
                    className="py-[2px] px-[6px] mr-1 border-2 hover:border-black border-slate-200 rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faDropletSlash}
                      className="w-4 h-4 text-slate-500"
                    />
                  </div>
                  {colorList.map((val, idx) => (
                    <div
                      onClick={(e) => handleChangeColor(e, val)}
                      key={idx}
                      className={`p-[12px] mr-1 rounded-full border-2 border-transparent hover:border-black`}
                      style={{ backgroundColor: val }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
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
