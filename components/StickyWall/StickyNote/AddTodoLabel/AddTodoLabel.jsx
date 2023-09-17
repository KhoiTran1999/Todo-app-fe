import { LabelSelector, TokenSelector } from "@/app/GlobalRedux/selector";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoLabel } from "./TodoLabel";
import { addLabelAxios } from "@/service/axiosService/labelAxios";
import { getLabel } from "@/app/GlobalRedux/Features/data/labelSlider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddTodoLabel = ({ todoId }) => {
  const dispatch = useDispatch();

  const labelList = useSelector(LabelSelector);
  const [searchLabel, setSearchLabel] = useState(labelList);
  const { accessToken } = useSelector(TokenSelector);

  const searchLabelRef = useRef("");

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

  const handleCreateLabel = () => {
    addLabelAxios(accessToken, { name: searchLabelRef.current.value })
      .then((res) => {
        dispatch(getLabel(res.data));
        setSearchLabel(res.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Validation error")
          toast("Can not duplicate Label", {
            type: "error",
            containerId: "normalError",
          });
      });

    searchLabelRef.current.value = "";
  };

  return (
    <div className="p-2 bg-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded cursor-default">
      <h4 className="text-slate-700 text-sm font-medium">Ghi chú nhãn</h4>
      <form action="" className="mt-2 flex justify-start items-center">
        <input
          ref={searchLabelRef}
          onChange={handleChangeSearchLabel}
          className="outline-none text-[15px] text-slate-700"
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
      {searchLabel.length === 0 && searchLabelRef.current?.value?.length > 0 ? (
        <div
          onClick={handleCreateLabel}
          className="p-[2px] -mx-2 -mb-2 border-t mt-4 hover:bg-slate-100 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="w-4 h-4 ml-2 text-slate-500"
          />
          <button className="text-sm text-slate-700 ml-3">
            Tạo{" "}
            <span className="text-sm font-medium">
              "{searchLabelRef.current?.value}"
            </span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
