"use client";

import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import { getTokenAxios, useGetToken } from "@/service/axiosService/authAxios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FirstRender = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/verifyEmail"
    ) {
      getTokenAxios(
        (res) => {
          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
          );
        },
        (err) => console.log(err)
      );
    }
  }, []);

  return <>{children}</>;
};

export default FirstRender;
