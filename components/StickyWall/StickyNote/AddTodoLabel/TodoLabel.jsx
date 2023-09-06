import { TokenSelector } from "@/app/GlobalRedux/selector";
import {
  addTodoLabelAxios,
  deleteTodoLabelAxios,
  getTodoLabelAxios,
} from "@/service/axiosService/labelAxios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const TodoLabel = ({ name, labelId, todoId }) => {
  const { accessToken } = useSelector(TokenSelector);

  const checkBoxRef = useRef();

  useEffect(() => {
    if (accessToken) {
      getTodoLabelAxios(accessToken, labelId).then((res) => {
        res.data.forEach((val) => {
          if (val.id === todoId) checkBoxRef.current.checked = true;
        });
      });
    }
  }, [accessToken]);

  const handleAddLabel = async (e, labelId) => {
    const isChecked = checkBoxRef.current.checked;

    if (!isChecked) {
      return await deleteTodoLabelAxios(accessToken, todoId, labelId)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }

    await addTodoLabelAxios(accessToken, { labelId, todoId })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        ref={checkBoxRef}
        onChange={(e) => handleAddLabel(e, labelId)}
        className="mr-2 "
        id={labelId + todoId}
        type="checkbox"
      />
      <label className="text-sm text-slate-600" htmlFor={labelId + todoId}>
        {name}
      </label>
    </div>
  );
};
