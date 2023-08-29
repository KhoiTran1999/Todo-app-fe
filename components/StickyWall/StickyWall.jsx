"use client";
import { useSelector } from "react-redux";
import StickyNoteGrid from "./StickyNote/StickyNoteGrid";
import { SidebarSelector, ViewModeSelector } from "@/app/GlobalRedux/selector";
import StickyNoteList from "./StickyNote/StickyNoteList";

const StickyWall = () => {
  const toggle = useSelector(SidebarSelector);
  const viewMode = useSelector(ViewModeSelector);

  return (
    <div
      className={`pl-3 pb-3 w-full h-full ${
        toggle ? "ml-[300px]" : "ml-[70px]"
      }`}
    >
      <div className="w-full my-10 flex justify-center items-center">
        <div className="w-1/2 p-3 bg-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded">
          <form action="addTodo" className="flex justify-start items-center">
            <input
              className=" w-full bg-transparent outline-none"
              id="search"
              type="search"
              placeholder="Tạo ghi chú..."
            />
          </form>
        </div>
      </div>
      {viewMode ? <StickyNoteGrid /> : <StickyNoteList />}
    </div>
  );
};

export default StickyWall;
