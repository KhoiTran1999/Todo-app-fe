"use client";
import { useDispatch, useSelector } from "react-redux";
import StickyNoteGrid from "./StickyNote/StickyNoteGrid";
import {
  SidebarSelector,
  TodoListPinSelector,
  TodoListUnpinSelector,
  TokenSelector,
  ViewModeSelector,
} from "@/app/GlobalRedux/selector";
import StickyNoteList from "./StickyNote/StickyNoteList";
import { useRef, useState } from "react";
import { useClickOutsideStickyWall } from "@/hooks/useClickOutsideStickyWall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faDropletSlash,
  faFaceSmile,
  faPalette,
  faTag,
  faThumbTack,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { addTodoAxios } from "@/service/axiosService/todoAxios";
import Image from "next/image";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { colorList } from "@/constant/colorList";
import { usePathname } from "next/navigation";

const StickyWall = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [isFocus, setIsFocus] = useState(false);
  const [colorPosition, setColorPosition] = useState(48);
  const [colorToggle, setColorToggle] = useState(false);
  const [color, setColor] = useState("white");
  const [isPin, setIsPin] = useState(false);

  const todoListUnpin = useSelector(TodoListUnpinSelector);
  const todoListPin = useSelector(TodoListPinSelector);
  const toggle = useSelector(SidebarSelector);
  const viewMode = useSelector(ViewModeSelector);
  const token = useSelector(TokenSelector);

  const titleRef = useRef("");
  const contentRef = useRef("");
  const wrapperRef = useRef(null);

  useClickOutsideStickyWall(
    wrapperRef,
    setIsFocus,
    titleRef,
    contentRef,
    setColorToggle,
    color,
    setColor,
    isPin,
    setIsPin
  );

  const autoGrow = (element) => {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
    setColorPosition((prev) => `${prev + element.target.scrollHeight}px`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.content.value.trim().length !== 0) {
      const res = await addTodoAxios(token.accessToken, {
        title: e.target.title.value.trim(),
        content: e.target.content.value.trim(),
        color,
        pin: isPin,
      });

      dispatch(getTodoList(res.data));
      titleRef.current.style.height = "24px";
      contentRef.current.style.height = "24px";
      e.target.title.value = null;
      e.target.content.value = null;
      setIsFocus(false);
      setIsPin(false);
    }

    e.target.title.value = null;
    e.target.content.value = null;
    setIsPin(false);
    setIsFocus(false);
    setColor("white");
    setColorToggle(false);
  };

  const handleDeleteTodo = () => {
    titleRef.current.value = null;
    contentRef.current.value = null;
    setIsFocus(false);
    setColor("white");
  };

  const handleColorToggle = () => {
    setColorToggle((prev) => !prev);
  };

  const handleChangeColor = (e, elementColor) => {
    setColor(elementColor);
  };

  return (
    <div
      className={`pl-3 pb-3 w-full h-full ${
        toggle ? "ml-[300px]" : "ml-[70px]"
      }`}
    >
      {pathname === "/todo/trash" ? (
        <div className="text-center italic font-medium text-slate-700 mt-7">
          Ghi chú trong Thùng rác bị xóa sau 7 ngày.{" "}
          <span className="text-sm not-italic text-blue-500 hover:underline cursor-pointer">
            Dọn sạch thùng rác
          </span>
        </div>
      ) : (
        <></>
      )}
      {pathname === "/todo/archive" ||
      pathname === "/todo/trash" ||
      pathname === "/todo/search" ? (
        <></>
      ) : (
        <div className="w-full my-10 flex justify-center items-center">
          <div ref={wrapperRef} className="w-2/5">
            <div
              className="pt-2 pl-4 pr-7 max-h-[650px] overflow-y-auto bg-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-lg relative"
              style={{ backgroundColor: color }}
            >
              <form id="addTodo" onSubmit={handleSubmit} action="addTodo">
                <textarea
                  ref={titleRef}
                  maxLength={1000}
                  onInput={autoGrow}
                  onFocus={() => setIsFocus(true)}
                  className="resize-none overflow-hidden h-6 font-medium w-full bg-transparent outline-none placeholder:font-medium placeholder:text-slate-500"
                  type="text"
                  name="title"
                  placeholder={isFocus ? "Tiêu đề" : "Tạo ghi chú..."}
                />
                <textarea
                  ref={contentRef}
                  maxLength={20000}
                  onInput={autoGrow}
                  className={`resize-none overflow-hidden ${
                    isFocus ? "h-6 w-full mt-5" : "h-0 w-0"
                  } bg-transparent outline-none placeholder:text-slate-400 placeholder:text-[15px]`}
                  type="text"
                  name="content"
                  placeholder="Tạo ghi chú..."
                />
              </form>
              {isFocus ? (
                <>
                  <div className="mt-4 flex justify-center items-center relative">
                    <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
                      <FontAwesomeIcon
                        icon={faBell}
                        className="w-5 h-5 text-slate-500"
                      />
                    </div>
                    <div
                      onClick={handleColorToggle}
                      className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
                    >
                      <FontAwesomeIcon
                        icon={faPalette}
                        className="w-5 h-5 text-slate-500"
                      />
                    </div>
                    <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
                      <FontAwesomeIcon
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
                    <button
                      form="addTodo"
                      type="submit"
                      className="font-medium text-slate-700 px-5 py-1 rounded hover:bg-slate-100  absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      Đóng
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 flex items-center justify-center cursor-pointer p-1 hover:bg-slate-200 rounded-full">
                    {isPin ? (
                      <FontAwesomeIcon
                        onClick={() => setIsPin(false)}
                        icon={faThumbTack}
                        className="w-5 h-5 text-slate-500"
                      />
                    ) : (
                      <Image
                        onClick={() => setIsPin(true)}
                        className=" text-slate-500"
                        width={22}
                        height={22}
                        src="/static/img/unpin.ico"
                        alt=""
                      />
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {colorToggle && (
              <div
                className={`bg-white p-2 shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-lg absolute ${colorPosition} z-50 cursor-pointer`}
              >
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
        </div>
      )}
      {todoListPin.length === 0 && todoListUnpin.length === 0 ? (
        <div className="w-full h-screen flex flex-col justify-start items-center">
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="w-24 h-24 text-slate-500 mb-6 mt-16"
          />
          <div className="text-2xl text-slate-500 font-medium">
            Không có ghi chú nào
          </div>
        </div>
      ) : (
        <>
          {viewMode ? (
            <>
              <div>
                {todoListPin.length === 0 || pathname === "/todo/trash" ? (
                  <></>
                ) : (
                  <div className="text-[11px] m-3 font-medium text text-slate-500">
                    ĐƯỢC GHIM
                  </div>
                )}
                <StickyNoteGrid isPin={true} todoList={todoListPin} />
              </div>
              <div className="mt-10">
                {todoListUnpin.length === 0 || pathname === "/todo/trash" ? (
                  <></>
                ) : (
                  <div className="text-[11px] m-3 font-medium text text-slate-500">
                    KHÁC
                  </div>
                )}
                <StickyNoteGrid isPin={false} todoList={todoListUnpin} />
              </div>
            </>
          ) : (
            <>
              <div>
                {todoListPin.length === 0 || pathname === "/todo/trash" ? (
                  <></>
                ) : (
                  <div className="w-full max-w-[600px] m-auto text-[11px] my-3 font-medium text text-slate-500">
                    ĐƯỢC GHIM
                  </div>
                )}
                <StickyNoteList isPin={true} todoList={todoListPin} />
              </div>
              <div className="mt-10">
                {todoListUnpin.length === 0 || pathname === "/todo/trash" ? (
                  <></>
                ) : (
                  <div className="w-full max-w-[600px] m-auto text-[11px] my-3 font-medium text text-slate-500">
                    KHÁC
                  </div>
                )}
                <StickyNoteList isPin={false} todoList={todoListUnpin} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StickyWall;
