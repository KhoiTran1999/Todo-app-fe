'use client';

import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import {
  LimitSelector,
  SidebarSelector,
  TokenSelector,
} from '@/app/GlobalRedux/selector';
import StickyWall from '@/components/StickyWall/StickyWall';
import { getTodoAxios } from '@/service/axiosService/todoAxios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleAxiosLoading } from '@/app/GlobalRedux/Features/toggle/axiosLoadingSlider';

export default function Todo() {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);
  const toggle = useSelector(SidebarSelector);

  useEffect(() => {
    if (accessToken) {
      getTodoAxios(accessToken, limit).then((res) => {
        dispatch(getTodoList(res.data));
        dispatch(toggleAxiosLoading(false));
      });
    }
  }, [accessToken, toggle]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15, width: '100%', height: '100%' }}
        animate={{ opacity: 1, y: 0, width: '100%', height: '100%' }}
        exit={{ opacity: 0, y: 15, width: '100%', height: '100%' }}
        transition={{ delay: 0.25, width: '100%', height: '100%' }}
      >
        <StickyWall />
      </motion.div>
    </>
  );
}
