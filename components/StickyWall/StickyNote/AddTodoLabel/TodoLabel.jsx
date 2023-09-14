import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { TokenSelector } from "@/app/GlobalRedux/selector";
import {
  addTodoLabelAxios,
  deleteTodoLabelAxios,
  getTodoLabelAxios,
} from "@/service/axiosService/labelAxios";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TodoLabel = ({ name, labelId, todoId }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(TokenSelector);
  const pathname = usePathname();

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
    e.stopPropagation();

    const isChecked = checkBoxRef.current.checked;

    if (!isChecked) {
      return await deleteTodoLabelAxios(accessToken, todoId, labelId)
        .then(async (res) => {
          if (pathname === `/todo/${labelId}`) {
            await getTodoLabelAxios(accessToken, labelId).then((res) =>
              dispatch(getTodoList(res.data))
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    await addTodoLabelAxios(accessToken, { labelId, todoId }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <input
        ref={checkBoxRef}
        onChange={(e) => handleAddLabel(e, labelId)}
        className="mr-2 cursor-pointer"
        id={labelId + todoId}
        type="checkbox"
      />
      <label className="text-sm text-slate-600" htmlFor={labelId + todoId}>
        {name}
      </label>
    </div>
  );
};
