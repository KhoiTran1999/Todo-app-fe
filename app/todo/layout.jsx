"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenSelector } from "../GlobalRedux/selector";
import { refreshTokenAxios } from "@/service/axiosService";
import { getToken } from "../GlobalRedux/Features/data/tokenSlider";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TodoHeader } from "@/components/TodoHeader/TodoHeader";

export default function layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const token = useSelector(TokenSelector);

  useEffect(() => {
    setLoading(true);

    if (!token.accessToken || !token.refreshToken) return router.push("/");

    try {
      const isValidToken = verify(
        token.accessToken,
        env.JWT_ACCESSTOKEN_PRIVATE_KEY
      );
      if (isValidToken) setLoading(false);
    } catch (error) {
      if (!token.refreshToken) return router.push("/login");

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
        })
        .catch((err) => {
          console.log(err);
          return router.push("/");
        });
      console.log(error);
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-16 h-16 text-slate-700"
            spin={true}
          />
        </div>
      ) : (
        <div className="relative">
          <TodoHeader />
          <div className="mt-[59px] flex h-full items-start justify-start">
            <SideBar />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
