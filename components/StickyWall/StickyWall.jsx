"use client";
import { useDispatch, useSelector } from "react-redux";
import StickyNoteGrid from "./StickyNote/StickyNoteGrid";
import {
  SidebarSelector,
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
  faPalette,
  faTag,
  faThumbTack,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { addTodoAxios } from "@/service/axiosService/todoAxios";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";

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

const StickyWall = () => {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [colorToggle, setColorToggle] = useState(false);
  const [color, setColor] = useState("white");

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
    setColor
  );

  const autoGrow = (element) => {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.content.value.trim().length !== 0) {
      addTodoAxios(token.accessToken, {
        title: e.target.title.value.trim(),
        content: e.target.content.value.trim(),
        color,
      }).then((res) => {
        dispatch(getTodoList(res.data));
        titleRef.current.style.height = "24px";
        contentRef.current.style.height = "24px";
        e.target.title.value = null;
        e.target.content.value = null;
        setIsFocus(false);
      });
    }

    e.target.title.value = null;
    e.target.content.value = null;
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
  console.log(colorToggle);
  return (
    <div
      className={`pl-3 pb-3 w-full h-full ${
        toggle ? "ml-[300px]" : "ml-[70px]"
      }`}
    >
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
                <div className="absolute top-0 right-0 flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
                  <FontAwesomeIcon
                    icon={faThumbTack}
                    className="w-5 h-5 text-slate-500"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {colorToggle && (
            <div className="bg-white p-2 shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-lg absolute top-48 z-50 cursor-pointer">
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
      {viewMode ? <StickyNoteGrid /> : <StickyNoteList />}
    </div>
  );
};

export default StickyWall;
