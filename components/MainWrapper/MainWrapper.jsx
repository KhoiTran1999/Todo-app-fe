import { getLimit } from "@/app/GlobalRedux/Features/data/limitSlider";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FirstRender from "../FirstRender/FirstRender";
import { ToastContainer } from "react-toastify";
import { LimitSelector, TokenSelector } from "@/app/GlobalRedux/selector";
import { usePathname } from "next/navigation";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import {
  getAllTodoAxios,
  getArchiveTodoAxios,
  getTodoAxios,
} from "@/service/axiosService/todoAxios";

export const MainWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { accessToken } = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);

  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) setIsBottom(false);

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    setIsBottom(bottom);
  };

  useEffect(() => {
    if (accessToken) {
      if (pathname === "/todo/today") {
        getTodoAxios(accessToken, limit).then((res) =>
          dispatch(getTodoList(res.data))
        );
      } else if (pathname === "/todo/reminder") {
        getAllTodoAxios(accessToken, limit).then((res) => {
          const reminderTodoList = res.data.filter((val) => !!val.reminder);
          dispatch(getTodoList(reminderTodoList));
        });
      } else if (pathname === "/todo/archive") {
        getArchiveTodoAxios(accessToken, limit).then((res) =>
          dispatch(getTodoList(res.data))
        );
      }
    }
  }, [limit]);

  useEffect(() => {
    if (isBottom === true) {
      dispatch(getLimit());
    }
  }, [isBottom]);

  return (
    <div
      onScroll={handleScroll}
      className="bg-white select-none h-screen overflow-y-auto"
    >
      <FirstRender>{children}</FirstRender>
      <ToastContainer
        containerId={"normalError"}
        autoClose={3000}
        position="top-center"
        enableMultiContainer
      />
      <ToastContainer
        containerId={"limiterError"}
        autoClose={3000}
        position="top-center"
        pauseOnFocusLoss={false}
        enableMultiContainer
      />
    </div>
  );
};
