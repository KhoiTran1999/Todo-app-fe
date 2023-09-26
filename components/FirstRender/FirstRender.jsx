'use client';

import { getToken } from '@/app/GlobalRedux/Features/data/tokenSlider';
import { getTokenAxios } from '@/service/axiosService/authAxios';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const FirstRender = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/login' ||
      pathname === '/verifyEmail'
    ) {
      getTokenAxios(
        (res) => {
          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            }),
          );
        },
        (err) => console.log(err),
      );
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FirstRender;
