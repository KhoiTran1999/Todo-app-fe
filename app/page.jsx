"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";
import Image from "next/image";
import { refreshTokenAxios } from "@/service/axiosService/authAxios";
import { TokenSelector } from "./GlobalRedux/selector";
import { getToken } from "./GlobalRedux/Features/data/tokenSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const token = useSelector(TokenSelector);

  useEffect(() => {
    setLoading(true);
    if (!token.accessToken || !token.refreshToken) return setLoading(false);

    try {
      const isValidAccessToken = verify(
        token.accessToken,
        env.JWT_ACCESSTOKEN_PRIVATE_KEY
      );
      if (isValidAccessToken) return router.push("/todo/today");
    } catch (error) {
      refreshTokenAxios(token.refreshToken)
        .then((res) => {
          if (!res.success) {
            return router.push("/login");
          }

          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: token.refreshToken,
            })
          );

          router.push("/todo/today");
        })
        .catch((err) => {
          router.push("/login");
        });
    }
  }, [token]);

  return (
    <main>
      <>
        {loading ? (
          <div className="flex min-h-screen min-w-full items-center justify-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-16 h-16 text-slate-700"
              spin={true}
            />
          </div>
        ) : (
          <div className="flex min-h-screen min-w-full items-center justify-center ">
            <div className="w-2/5 p-4 mr-20 min-h-screen flex items-center justify-center">
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
              <p className="font-medium text-slate-700 my-8">
                Simplify, Be Inspired, Be Original, Work Hard, Enjoy
              </p>
              <div className="flex flex-col">
                <button
                  onClick={() => router.push("/verifyEmail")}
                  className="text-base py-2 px-3 text-slate-700 text-center bg-yellow-400 hover:bg-yellow-500 font-semibold rounded  ease-out duration-300"
                >
                  Get Started
                </button>
                <Link
                  href="/login"
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
        )}
      </>
    </main>
  );
}