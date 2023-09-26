'use client';

import { getLimit } from '@/app/GlobalRedux/Features/data/limitSlider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FirstRender from '../FirstRender/FirstRender';
import { ToastContainer } from 'react-toastify';
import {
  LimitSelector,
  TodoListSelector,
  TokenSelector,
} from '@/app/GlobalRedux/selector';
import { usePathname } from 'next/navigation';
import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { getTodoAxios } from '@/service/axiosService/todoAxios';

export const MainWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { accessToken } = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);
  const todoList = useSelector(TodoListSelector);

  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) setIsBottom(false);

    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    setIsBottom(bottom);
  };

  useEffect(() => {
    if (accessToken && todoList.length + 10 >= limit) {
      if (pathname === '/todo/today') {
        getTodoAxios(accessToken, limit).then((res) =>
          dispatch(getTodoList(res.data)),
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
      className="bg-white select-none h-screen overflow-auto"
    >
      <FirstRender>{children}</FirstRender>

      <ToastContainer
        containerId={'normalError'}
        autoClose={3000}
        position="top-center"
        enableMultiContainer
      />
      <ToastContainer
        containerId={'limiterError'}
        autoClose={3000}
        position="top-center"
        pauseOnFocusLoss={false}
        enableMultiContainer
      />
    </div>
  );
};
