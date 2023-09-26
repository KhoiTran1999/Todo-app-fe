'use client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenSelector } from '@/app/GlobalRedux/selector';
import { verifyEmailAxios } from '@/service/axiosService/authAxios';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function verifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isResendEmail, setIsResendEmail] = useState(false);

  const token = useSelector(TokenSelector);

  useEffect(() => {
    if (token.accessToken && token.refreshToken) {
      window.close();
      return router.push('/todo/today', undefined, { shallow: true });
    }
  }, [token]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    verifyEmailAxios({ email: e.target.email.value })
      .then((res) => {
        setIsSendEmail(true);
        setTimeout(() => {
          setIsResendEmail(true);
          setIsLoading(false);
        }, 1000 * 60);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          toast(`${err.response.data?.message}`, {
            type: 'error',
            containerId: 'limiterError',
            toastId: 'limiterError',
          });
        } else {
          toast(`${err.response.data?.message}`, {
            type: 'error',
            containerId: 'normalError',
          });
        }
        setIsLoading(false);
      });
  };

  const handleResentEmail = async (e) => {
    setIsLoading(true);
    handleOnSubmit(e);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        <div className="p-3 flex min-h-screen min-w-full items-center justify-center">
          <div className="w-2/5 p-4 mr-3 min-h-screen flex items-center justify-center max-[660px]:hidden">
            <Image
              src="/static/img/verifyEmail.jpg"
              className="rounded-lg"
              width={600}
              height={400}
              alt="Main picture"
            ></Image>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faUser}
              className="w-16 h-16 text-slate-700"
            />
            <form
              onSubmit={(handleOnSubmit, handleResentEmail)}
              className="flex flex-col items-center justify-center"
              id="formEmail"
            >
              {isSendEmail && !isResendEmail ? (
                <p className="my-5 text-slate-700 text-center">
                  A link have been sent to your email for verification.<br></br>
                  <strong>This link is only valid for the next 1 minute</strong>
                </p>
              ) : (
                <>
                  <label
                    htmlFor="otp"
                    className="text-base font-medium text-slate-700 mt-7 mb-5"
                  >
                    Enter your email here:
                  </label>
                </>
              )}

              <input
                className="py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                required
                minLength={1}
                autoFocus
              />

              {isResendEmail ? (
                <p className="mt-5 text-slate-600 text-center">
                  The link that have been sent to your email was invalid.
                  <br></br>
                  <strong>Please click button below to get new link</strong>
                </p>
              ) : (
                <></>
              )}

              {isLoading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="w-7 h-7 mt-5 mr-5 text-slate-600"
                  spin={true}
                />
              ) : (
                <>
                  {isResendEmail ? (
                    <button className="text-lg font-semibold py-2 px-3 w-full text-slate-600 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                      Resend Email
                    </button>
                  ) : (
                    <button className="text-lg font-semibold mt-5 py-2 px-3 w-full text-slate-600 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                      Verify
                    </button>
                  )}
                </>
              )}
            </form>
            <div className="mt-8 w-full pt-2 text-center border-t border-slate-400">
              <Link
                href="/login"
                shallow={true}
                className="text-base font-medium text-gray-800 text-center mt-3 hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
