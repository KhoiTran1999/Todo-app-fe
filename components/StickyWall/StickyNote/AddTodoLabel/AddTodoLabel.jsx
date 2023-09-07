import { LabelSelector, TokenSelector } from "@/app/GlobalRedux/selector";
import {
  addTodoLabelAxios,
  deleteTodoLabelAxios,
  getTodoLabelAxios,
} from "@/service/axiosService/labelAxios";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TodoLabel } from "./TodoLabel";

export const AddTodoLabel = ({ todoId }) => {
  const labelList = useSelector(LabelSelector);
  const { accessToken } = useSelector(TokenSelector);

  const [searchLabel, setSearchLabel] = useState(labelList);

  const searchLabelRef = useRef();

  const handleChangeSearchLabel = (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) setSearchLabel(labelList);
    const newLabelList = labelList.filter((val) => {
      const regex = new RegExp(`${value}`, "gi");
      const index = val.name.search(regex);
      if (index === -1) return false;
      else return true;
    });

    setSearchLabel(newLabelList);
  };

  return (
    <div className="p-2 bg-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded cursor-default">
      <h4 className="text-slate-700 text-sm font-medium">Ghi chú nhãn</h4>
      <form action="" className="mt-2 flex justify-start items-center">
        <input
          ref={searchLabelRef}
          onChange={handleChangeSearchLabel}
          className="outline-none text-[15px]"
          id="searchLabel"
          type="text"
          placeholder="Nhập tên nhãn"
        />
        <label htmlFor="searchLabel">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-3 h-3 text-slate-500"
          />
        </label>
      </form>
      <div className="mt-2 max-h-[250px] overflow-hidden hover:overflow-y-auto overscroll-none">
        {searchLabel.map((val, idx) => (
          <TodoLabel
            key={val.id}
            name={val.name}
            labelId={val.id}
            todoId={todoId}
          />
        ))}
      </div>
      {searchLabel.length === 0 ? (
        <div className="p-[2px] -mx-2 -mb-2 border-t mt-4 hover:bg-slate-100 cursor-pointer">
          <FontAwesomeIcon
            icon={faPlus}
            className="w-4 h-4 ml-2 text-slate-500"
          />
          <button className="text-sm ml-3">
            Tạo{" "}
            <span className="text-sm font-medium">
              "{searchLabelRef.current.value}"
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
