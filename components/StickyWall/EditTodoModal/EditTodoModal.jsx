import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  EditTodoModalSelector,
  TodoFormSelector,
  TodoListSelector,
  TokenSelector,
} from "@/app/GlobalRedux/selector";
import { useClickOutsideTodo } from "@/hooks/useClickOutsideTodo";
import { useClickOutsideTodoModal } from "@/hooks/useClickOutsideTodoModal";
import {
  faBell,
  faClock,
  faDropletSlash,
  faPalette,
  faTag,
  faThumbtack,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorList } from "@/constant/colorList";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import {
  deletePermanentTodoAxios,
  deleteTodoAxios,
  getTodoAxios,
  restoreTodoAxios,
  updateTodoAxios,
} from "@/service/axiosService/todoAxios";
import { getTodoForm } from "@/app/GlobalRedux/Features/data/todoFormSlider";
import Image from "next/image";
import { AddTodoLabel } from "../StickyNote/AddTodoLabel/AddTodoLabel";
import { toggleEditTodoModal } from "@/app/GlobalRedux/Features/toggle/editTodoModalSlider";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";
import DateTimePicker from "react-datetime-picker";

export const EditTodoModal = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const todoList = useSelector(TodoListSelector);
  const toggleTodoModal = useSelector(EditTodoModalSelector);
  const todoForm = useSelector(TodoFormSelector);
  const { accessToken } = useSelector(TokenSelector);

  const modalRef = useRef();
  const titleRef = useRef("");
  const contentRef = useRef("");
  const colorRef = useRef("");
  const labelRef = useRef("");
  const datePickerRef = useRef();

  const [colorToggle, setColorToggle] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);
  const [titleValue, setTitleValue] = useState(titleRef.current.value);
  const [contentValue, setContentValue] = useState(contentRef.current.value);
  const [timePickerToggle, setTimePickerToggle] = useState(false);
  const [timeValue, setTimeValue] = useState(todoForm.reminder);

  useClickOutsideTodoModal(modalRef);
  useClickOutsideTodo(colorRef, setColorToggle);
  useClickOutsideTodo(labelRef, setLabelToggle);
  useClickOutsideTodo(datePickerRef, setTimePickerToggle);

  const autoGrow = (element) => {
    element.target.style.height = "25px";
    element.target.style.height = element.target.scrollHeight + "px";
  };

  useEffect(() => {
    setTimeValue(todoForm.reminder);
  }, [todoForm.reminder]);

  useEffect(() => {
    if (toggleTodoModal) {
      titleRef.current.value = todoForm.title;
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      titleRef.current.focus();

      contentRef.current.value = todoForm.content;
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    } else {
      titleRef.current.style.height = "0px";
      contentRef.current.style.height = "0px";
    }
  }, [toggleTodoModal]);

  const titleDebounce = useDebounce(titleValue, 1000);
  const contentDebounce = useDebounce(contentValue, 1000);

  useEffect(() => {
    const updateData = async () => {
      if (contentDebounce.trim().length === 0) return;
      if (!todoForm.id) {
        setTitleValue("");
        setContentValue("");
        return;
      }

      await updateTodoAxios(accessToken, todoForm.id, {
        title: titleDebounce.trim(),
        content: contentDebounce.trim(),
        color: todoForm.color,
        pin: todoForm.pin,
      });
      const newTodoList = await getTodoAxios(accessToken);
      dispatch(getTodoList(newTodoList.data));
      dispatch(
        getTodoForm({
          ...todoForm,
          title: titleDebounce,
          content: contentDebounce,
        })
      );
    };
    updateData();
  }, [titleDebounce, contentDebounce]);

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    setTitleValue(titleRef.current.value);
    setContentValue(contentRef.current.value);
  };

  const handleColorToggle = (e) => {
    e.stopPropagation();
    setColorToggle((prev) => !prev);
  };

  const handleChangeColor = async (e, elementColor) => {
    e.stopPropagation();
    await updateTodoAxios(accessToken, todoForm.id, {
      color: elementColor,
    });

    const newTodoList = todoList.map((val) => {
      if (val.id === todoForm.id) {
        const newTodo = { ...val, color: elementColor };
        return newTodo;
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
    dispatch(getTodoForm({ ...todoForm, color: elementColor }));
  };

  const handlePin = async (e, isPin) => {
    e.stopPropagation();
    await updateTodoAxios(accessToken, todoForm.id, { pin: isPin });

    const newTodoList = todoList.map((val) => {
      if (val.id === todoForm.id) {
        const newTodo = { ...val, pin: isPin };
        return newTodo;
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
    dispatch(getTodoForm({ ...todoForm, pin: isPin }));
  };

  const handleAddTodoLabel = (e) => {
    e.stopPropagation();
    setLabelToggle((prev) => !prev);
  };

  const handleDeleteTodo = async (e) => {
    e.stopPropagation();
    await deleteTodoAxios(accessToken, todoForm.id);

    const newTodoList = todoList.filter((val) => val.id !== todoForm.id);
    dispatch(getTodoList(newTodoList));
    dispatch(toggleEditTodoModal(false));
    dispatch(getTodoForm({}));
  };

  const handleClose = () => {
    dispatch(toggleEditTodoModal(false));
    dispatch(getTodoForm({}));
  };

  const handleRestoreTodo = async (e) => {
    e.stopPropagation();

    const res = await restoreTodoAxios(accessToken, todoForm.id);
    dispatch(getTodoList(res.data));
    dispatch(toggleEditTodoModal(false));
  };

  const HandleDeleteTodoPermanently = async (e) => {
    e.stopPropagation();

    await deletePermanentTodoAxios(accessToken, todoForm.id);

    const newTodoList = todoList.filter((val) => val.id !== todoForm.id);
    dispatch(getTodoList(newTodoList));
    dispatch(toggleEditTodoModal(false));
  };

  const handleChangeDatePicker = async (value) => {
    setTimeValue(value);

    await updateTodoAxios(accessToken, todoForm.id, { reminder: value });
    const newTodoList = todoList.map((val) => {
      if (val.id === todoForm.id) {
        return { ...val, reminder: value };
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
  };

  return (
    <div
      className={`${
        toggleTodoModal
          ? "w-screen h-screen opacity-100 visible"
          : "w-0 h-0 invisible opacity-0"
      } first-letter:text-center bg-neutral-700 bg-opacity-30 fixed top-0 left-0 z-[1001]`}
    >
      <div
        ref={modalRef}
        className={`bg-white ${
          toggleTodoModal ? "opacity-100" : "opacity-0"
        } w-[600px] max-h-[580px] transition-opacity flex flex-col justify-between items-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded select-none`}
        style={{ backgroundColor: todoForm.color }}
      >
        <form
          action=""
          id="updateTodo"
          className="w-full h-full px-4 overflow-y-auto overscroll-none"
          onChange={handleUpdateTodo}
        >
          {pathname === "/todo/trash" ? (
            <>
              <div
                ref={titleRef}
                className="overflow-hidden font-medium text-2xl pt-3 w-full bg-transparent outline-none placeholder:font-medium placeholder:text-slate-500"
              >
                {todoForm.title}
              </div>
              <div
                ref={contentRef}
                className={`overflow-hidden w-full mt-5 bg-transparent outline-none placeholder:text-slate-400 placeholder:text-[15px]`}
              >
                {todoForm.content}
              </div>
            </>
          ) : (
            <>
              <textarea
                ref={titleRef}
                maxLength={1000}
                onInput={autoGrow}
                type="text"
                name="title"
                className="resize-none overflow-hidden font-medium text-2xl pt-3 w-full bg-transparent outline-none placeholder:font-medium placeholder:text-slate-500"
                placeholder="Tiêu đề"
              />
              <textarea
                ref={contentRef}
                maxLength={20000}
                onInput={autoGrow}
                type="text"
                name="content"
                className={`resize-none overflow-hidden w-full mt-5 bg-transparent outline-none placeholder:text-slate-400 placeholder:text-[15px]`}
                placeholder="Tạo ghi chú..."
              />
            </>
          )}
          {timeValue && (
            <div className="px-2 mt-4 bg-slate-100 w-fit rounded-full">
              <FontAwesomeIcon
                icon={faClock}
                className="w-3 h-3 text-slate-500"
              />
              <span className="text-xs ml-2">
                {moment(timeValue).calendar()}
              </span>
            </div>
          )}
          <div className="text-right text-sm text-slate-700 my-1">
            updated at {moment(todoForm.updatedAt).fromNow()}
          </div>
        </form>

        <div className="px-3 py-1 w-full shadow-[0_-1px_10px_1px_rgba(0,0,0,0.3)] flex justify-center items-center relative">
          <div className="flex justify-center items-center">
            {pathname === "/todo/trash" ? (
              <>
                <div
                  onClick={handleRestoreTodo}
                  id="restoreTrash"
                  className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faTrashCanArrowUp}
                    className="w-5 h-5 text-slate-500"
                  />
                </div>
                <Tooltip
                  anchorSelect="#restoreTrash"
                  place="bottom"
                  opacity={0.9}
                  style={{ transition: "none" }}
                >
                  Khôi phục
                </Tooltip>

                <div
                  onClick={HandleDeleteTodoPermanently}
                  id="deletedPermanence"
                  className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="w-5 h-5 text-slate-500"
                  />
                </div>
                <Tooltip
                  anchorSelect="#deletedPermanence"
                  place="bottom"
                  opacity={0.9}
                  style={{ transition: "none" }}
                >
                  Xóa vĩnh viễn
                </Tooltip>
              </>
            ) : (
              <>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimePickerToggle((prev) => !prev);
                  }}
                  className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="w-5 h-5 text-slate-500"
                  />
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
                    <div className="bg-white p-2 shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-lg absolute -top-[52px] ">
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
                  <FontAwesomeIcon
                    onClick={handleAddTodoLabel}
                    icon={faTag}
                    className="w-5 h-5 text-slate-500"
                  />
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
              </>
            )}
          </div>
          <button
            onClick={handleClose}
            form="addTodo"
            type="submit"
            className="font-medium text-slate-700 px-5 py-1 rounded hover:bg-slate-100 absolute right-3"
          >
            Đóng
          </button>
        </div>
        {pathname !== "/todo/trash" && (
          <div className="absolute top-0 right-0 flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            {todoForm.pin ? (
              <FontAwesomeIcon
                onClick={(e) => handlePin(e, false)}
                icon={faThumbtack}
                className="w-5 h-5 text-slate-500"
              />
            ) : (
              <Image
                onClick={(e) => handlePin(e, true)}
                className=" text-slate-500"
                width={21}
                height={21}
                src="/static/img/unpin.ico"
                alt=""
              />
            )}
          </div>
        )}
        {labelToggle && (
          <div className="absolute left-60 bottom-12 z-[1000]" ref={labelRef}>
            <AddTodoLabel todoId={todoForm.id} />
          </div>
        )}
        {timePickerToggle && (
          <div ref={datePickerRef} className="absolute -bottom-8 z-[1000]">
            <div className=" bg-white">
              <DateTimePicker
                onChange={handleChangeDatePicker}
                value={timeValue}
                disableClock
                minDate={new Date()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
