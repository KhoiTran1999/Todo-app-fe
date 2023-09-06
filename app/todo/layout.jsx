"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenSelector } from "../GlobalRedux/selector";
import {
  getTokenAxios,
  refreshTokenAxios,
} from "@/service/axiosService/authAxios";
import { getToken } from "../GlobalRedux/Features/data/tokenSlider";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TodoHeader } from "@/components/TodoHeader/TodoHeader";
import { getTodoAxios } from "@/service/axiosService/todoAxios";
import { getLabelAxios } from "@/service/axiosService/labelAxios";
import { getLabel } from "../GlobalRedux/Features/data/labelSlider";
import { getTodoList } from "../GlobalRedux/Features/data/todoListSlider";
import { EditLabelModal } from "@/components/SideBar/EditLabelModal/EditLabelModal";
import { EditTodoModal } from "@/components/StickyWall/EditTodoModal/EditTodoModal";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const token = useSelector(TokenSelector);

  useEffect(() => {
    getTokenAxios((res) => {
      const accessToken = res.accessToken;
      const refreshToken = res.refreshToken;

      if (!refreshToken) return router.push("/login");

      if (!accessToken) {
        refreshTokenAxios(refreshToken).then((res) => {
          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: refreshToken,
            })
          );
        });
        return setLoading(false);
      }

      const isValidToken = verify(accessToken, env.JWT_ACCESSTOKEN_PRIVATE_KEY);

      if (isValidToken) {
        dispatch(
          getToken({
            accessToken,
            refreshToken,
          })
        );
        return setLoading(false);
      }

      router.push("/login");
    });
  }, []);

  useEffect(() => {
    if (token.accessToken) {
      setLoading(true);
      getTodoAxios(token.accessToken)
        .then((res) => {
          dispatch(getTodoList(res.data));
        })
        .catch((err) => console.log(err));

      getLabelAxios(token.accessToken)
        .then((res) => {
          dispatch(getLabel(res.data));
          setLoading(false);
        })
        .catch((err) => console.log(err));
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
      <EditLabelModal />
      <EditTodoModal />
    </>
  );
}
