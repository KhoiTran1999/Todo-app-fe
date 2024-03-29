'use client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '@/app/GlobalRedux/Features/data/tokenSlider';
import { getTokenAxios, loginAxios } from '@/service/axiosService/authAxios';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

export default function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTokenAxios(
      (res) => {
        if (res.accessToken && res.refreshToken)
          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            }),
          );
        return router.push('/todo/today', undefined, { shallow: true });
      },
      (err) => {
        return dispatch(getToken({}));
      },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    loginAxios(data)
      .then((res) => {
        dispatch(
          getToken({
            accessToken: res.token.accessToken,
            refreshToken: res.token.refreshToken,
          }),
        );
        return router.push('/todo/today', undefined, { shallow: true });
      })
      .catch((err) => {
        if (err.response?.status === 429) {
          toast(`${err.response.data?.message}`, {
            type: 'error',
            containerId: 'limiterError',
            toastId: 'limiterError',
          });
        }
        if (err.response?.status === 401) {
          toast(`${err.response.data?.message}`, {
            type: 'error',
            containerId: 'normalError',
          });
        }
        e.target.password.value = '';
        setIsLoading(false);
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exist={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <div className="p-3 flex min-h-screen min-w-full items-center justify-center">
          <div className="w-2/5 p-4 mr-20 min-h-screen flex items-center justify-center max-[660px]:hidden">
            <Image
              src="/static/img/login.jpg"
              className="rounded-lg"
              width={600}
              height={400}
              alt="Main picture"
            ></Image>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="w-16 h-16 text-slate-700"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <input
                className="mt-9 mb-6 py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                required
                autoFocus
              />
              <input
                className="py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                minLength={1}
                required
              />
              <div className="w-full mt-5 flex justify-center items-center">
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="w-7 h-7 mr-5 text-slate-700"
                    spin={true}
                  />
                ) : (
                  <button className="text-base font-semibold py-2 px-3 w-full text-slate-700 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                    Sign in
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8 w-full pt-2 text-center border-t border-slate-400">
              <Link
                href="/verifyEmail"
                shallow={true}
                className="text-base font-semibold text-slate-700 hover:underline"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
