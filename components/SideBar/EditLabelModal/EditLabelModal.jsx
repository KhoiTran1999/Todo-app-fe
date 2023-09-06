import { getLabel } from "@/app/GlobalRedux/Features/data/labelSlider";
import { toggleEditLabelModal } from "@/app/GlobalRedux/Features/toggle/editLabelModalSlider";
import {
  LabelSelector,
  EditLabelModalSelector,
  TokenSelector,
} from "@/app/GlobalRedux/selector";
import { useClickOutsideLabelModal } from "@/hooks/useClickOutsideLabelModal";
import { addLabelAxios } from "@/service/axiosService/labelAxios";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LabelContent } from "./LabelContent";

export const EditLabelModal = () => {
  const dispatch = useDispatch();

  const labelList = useSelector(LabelSelector);
  const toggleEditLabelModalSelector = useSelector(EditLabelModalSelector);
  const { accessToken } = useSelector(TokenSelector);

  const modalRef = useRef();
  useClickOutsideLabelModal(modalRef);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.label.value.trim().length === 0) {
      return;
    }

    addLabelAxios(accessToken, { name: e.target.label.value })
      .then((res) => {
        dispatch(getLabel(res.data));
      })
      .catch((err) => {
        if (err.response.data.message === "Validation error")
          alert("Can not duplicate Label");
      });

    e.target.label.value = null;
  };

  return (
    <div
      className={`text-center bg-neutral-700 bg-opacity-30 fixed top-0 left-0 z-[1001] ${
        toggleEditLabelModalSelector ? "w-screen h-screen" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white p-3 w-[330px] absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded select-none"
      >
        <h4 className="text-left text-lg font-medium text-slate-600">
          Chỉnh sữa nhãn
        </h4>

        <form
          onSubmit={handleSubmit}
          className="my-3 flex justify-between items-center"
          action=""
        >
          <label className="ml-2 mr-3 cursor-pointer" htmlFor="label">
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-slate-500" />
          </label>
          <input
            name="label"
            id="label"
            className="outline-none border-b w-full pb-1 focus:border-slate-300 border-transparent placeholder:text-slate-500 placeholder:font-medium"
            type="text"
            placeholder="Tạo nhãn mới"
            maxLength={50}
          />
          <button className="mx-2">
            <FontAwesomeIcon
              icon={faCheck}
              className="w-4 h-4 text-slate-500"
            />
          </button>
        </form>

        <ul className="pb-3 border-b border-slate-400 max-h-[280px] overflow-y-auto overscroll-contain">
          {labelList.map((val, idx) => {
            return <LabelContent key={idx} name={val.name} id={val.id} />;
          })}
        </ul>

        <div className="m-4 flex justify-end items-center">
          <button
            onClick={() => dispatch(toggleEditLabelModal(false))}
            className="py-2 px-4 text-slate-700 font-medium hover:bg-slate-100 rounded"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};
