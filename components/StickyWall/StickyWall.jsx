"use client";
import StickyNote from "./StickyNote/StickyNote";

const StickyWall = () => {
  return (
    <div className="pl-3 pb-3 w-full h-full">
      <h1 className="text-4xl font-bold text-slate-700">Sticky Wall</h1>
      <StickyNote />
    </div>
  );
};

export default StickyWall;
