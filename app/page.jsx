'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import { verify } from 'jsonwebtoken';
import env from '@/config/env';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { refreshTokenAxios } from '@/service/axiosService/authAxios';
import { TokenSelector } from './GlobalRedux/selector';
import { getToken } from './GlobalRedux/Features/data/tokenSlider';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(TokenSelector);

  useEffect(() => {
    if (!token.refreshToken || !token.accessToken) return;

    const isValidAccessToken = verify(
      token.accessToken,
      env.JWT_ACCESSTOKEN_PRIVATE_KEY,
    );

    if (isValidAccessToken)
      return router.push('/todo/today', undefined, { shallow: 'true' });

    refreshTokenAxios(token.refreshToken)
      .then((res) => {
        if (!res.success) {
          return router.push('/login', undefined, { shallow: 'true' });
        }
        dispatch(
          getToken({
            accessToken: res.accessToken,
            refreshToken: token.refreshToken,
          }),
        );

        router.push('/todo/today', undefined, { shallow: 'true' });
      })
      .catch((err) => {
        router.push('/login', undefined, { shallow: 'true' });
      });
  }, [token]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <main>
          <div className="p-3 flex min-h-screen min-w-full items-center justify-center">
            <div className="w-2/5 p-4 mr-20 min-h-screen flex items-center justify-center max-[660px]:hidden">
              <Image
                src="/static/img/home.jpg"
                className="rounded-lg"
                width={600}
                height={400}
                alt="Main picture"
              ></Image>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-700 text-center">
                Free your mind
              </h1>
              <div>
                <div className="font-medium w-[340px] max-[330px]:w-[320px] h-12 text-slate-700 my-8 text-center break-words">
                  <Typewriter
                    options={{
                      strings: [
                        'Simplify, Be Inspired, Be Original and Work Hard',
                        "Let's enjoy now...",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <Link
                  href="/verifyEmail"
                  shallow={true}
                  className="text-base w-full max-[368px]:w-[250px] py-2 px-3 text-slate-700 text-center bg-yellow-400 hover:bg-yellow-500 font-semibold rounded  ease-out duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  shallow={true}
                  className="text-base font-semibold text-slate-700 text-center mt-3 hover:underline"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
            <div className="flex justify-end absolute bottom-2 right-0">
              <span className="text-sm font-medium mr-7 text-slate-500">
                © 2023 Khoi Tran. All rights reserved.
              </span>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}
