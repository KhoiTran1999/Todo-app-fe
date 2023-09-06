import {
  EditTodoModalSelector,
  TodoFormSelector,
} from "@/app/GlobalRedux/selector";
import { useClickOutsideTodoModal } from "@/hooks/useClickOutsideTodoModal";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const EditTodoModal = () => {
  const [colorPosition, setColorPosition] = useState(48);

  const toggleTodoModal = useSelector(EditTodoModalSelector);
  const todoForm = useSelector(TodoFormSelector);

  const modalRef = useRef();
  const titleRef = useRef("");
  const contentRef = useRef("");

  useClickOutsideTodoModal(modalRef);

  const autoGrow = (element) => {
    element.target.style.height = "25px";
    element.target.style.height = element.target.scrollHeight + "px";
    setColorPosition((prev) => `${prev + element.target.scrollHeight}px`);
  };

  useEffect(() => {
    if (toggleTodoModal) {
      titleRef.current.value = todoForm.title;
      titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      titleRef.current.focus();

      contentRef.current.value = todoForm.content;
      contentRef.current.style.height = contentRef.current.scrollHeight + "px";
    } else {
      titleRef.current.style.height = "0px";
      contentRef.current.style.height = "0px";
    }
  }, [toggleTodoModal]);

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

  return (
    <div
      className={`${
        toggleTodoModal ? "w-screen h-screen" : "hidden"
      } first-letter:text-center bg-neutral-700 bg-opacity-30 fixed top-0 left-0 z-[1001]`}
    >
      <div
        ref={modalRef}
        className="bg-white w-[600px] max-h-[580px] flex flex-col justify-between items-center absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded select-none"
      >
        <form
          action=""
          id="updateTodo"
          className="w-full h-full px-4 overflow-y-auto overscroll-none"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={titleRef}
            maxLength={1000}
            onInput={autoGrow}
            type="text"
            name="title"
            className="resize-none overflow-hidden font-medium text-2xl pt-3 w-full bg-transparent outline-none placeholder:font-medium placeholder:text-slate-500"
            placeholder="Tiêu đề"
          />
          <textarea
            ref={contentRef}
            maxLength={20000}
            onInput={autoGrow}
            type="text"
            name="content"
            className={`resize-none overflow-hidden w-full mt-5 bg-transparent outline-none placeholder:text-slate-400 placeholder:text-[15px]`}
            placeholder="Tạo ghi chú..."
          />
        </form>

        <div className="m-4 flex justify-end items-center">
          <button className="py-2 px-4 text-slate-700 font-medium hover:bg-slate-100 rounded">
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};
