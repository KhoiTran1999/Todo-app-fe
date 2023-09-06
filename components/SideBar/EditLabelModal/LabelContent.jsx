import { getLabel } from "@/app/GlobalRedux/Features/data/labelSlider";
import { LabelSelector, TokenSelector } from "@/app/GlobalRedux/selector";
import {
  deleteLabelAxios,
  updateLabelAxios,
} from "@/service/axiosService/labelAxios";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LabelContent = ({ name, id }) => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);
  const labelList = useSelector(LabelSelector);

  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteLabel = () => {
    deleteLabelAxios(
      accessToken,
      id,
      (res) => {
        dispatch(getLabel(labelList.filter((val) => val.id !== id)));
      },
      (err) => console.log(err)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = e.target.label.value.trim();
    if (value.length === 0) return;

    updateLabelAxios(
      accessToken,
      id,
      { name: value },
      (res) => {
        dispatch(getLabel(res.data));
      },
      () => {
        labelList.forEach((val) => {
          if (val.id === id) {
            e.target.label.value = val.name;
          }
        });
        dispatch(getLabel(labelList));
        alert("Could not duplicate label");
      }
    );
  };

  return (
    <li className="mb-4 flex justify-between items-center">
      <div className="flex justify-start items-center">
        <div
          onClick={handleDeleteLabel}
          className="py-1 px-2 mr-5 hover:bg-slate-100 cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-slate-500" />
        </div>
        <form id={`labelContent${id}`} action="" onSubmit={handleSubmit}>
          {isEdit ? (
            <input
              name="label"
              type="text"
              className={`text-slate-700 font-medium outline-none border-b  ${
                isEdit ? "border-slate-400" : "border-transparent"
              }`}
              readOnly={!isEdit}
              maxLength={50}
            />
          ) : (
            <div className="text-slate-700 font-medium">{name}</div>
          )}
        </form>
      </div>
      {isEdit ? (
        <button
          type="submit"
          form={`labelContent${id}`}
          className="py-1 px-2 text-sm text-slate-500 hover:bg-slate-100 cursor-pointer rounded"
          onClick={() => {
            setTimeout(() => {
              setIsEdit((prev) => !prev);
            }, 0);
          }}
        >
          Xong
        </button>
      ) : (
        <label htmlFor="">
          <FontAwesomeIcon
            onClick={() => setIsEdit((prev) => !prev)}
            icon={faPen}
            className="w-4 h-4 p-2 text-slate-500 hover:bg-slate-100 cursor-pointer rounded-full "
          />
        </label>
      )}
    </li>
  );
};
