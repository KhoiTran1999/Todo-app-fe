'use client';

import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { TokenSelector } from '@/app/GlobalRedux/selector';
import StickyWall from '@/components/StickyWall/StickyWall';
import { getDeletedTodoAxios } from '@/service/axiosService/todoAxios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Todo() {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);

  useEffect(() => {
    if (accessToken) {
      getDeletedTodoAxios(accessToken).then((res) => {
        dispatch(getTodoList(res.data));
      });
    }
  }, [accessToken]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15, width: '100%', height: '100%' }}
        animate={{ opacity: 1, y: 0, width: '100%', height: '100%' }}
        exist={{ opacity: 0, y: 15, width: '100%', height: '100%' }}
        transition={{ delay: 0.25, width: '100%', height: '100%' }}
      >
        <StickyWall />
      </motion.div>
    </>
  );
}
