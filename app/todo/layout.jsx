"use client";

import SideBar from "@/components/SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditLabelModalSelector,
  EditTodoModalSelector,
  TokenSelector,
} from "../GlobalRedux/selector";
import {
  getTokenAxios,
  refreshTokenAxios,
} from "@/service/axiosService/authAxios";
import { getToken } from "../GlobalRedux/Features/data/tokenSlider";
import { verify } from "jsonwebtoken";
import env from "@/config/env";
import { TodoHeader } from "@/components/TodoHeader/TodoHeader";
import { getLabelAxios } from "@/service/axiosService/labelAxios";
import { getLabel } from "../GlobalRedux/Features/data/labelSlider";
import { EditLabelModal } from "@/components/SideBar/EditLabelModal/EditLabelModal";
import { EditTodoModal } from "@/components/StickyWall/EditTodoModal/EditTodoModal";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector(TokenSelector);
  const toggleEditLabelModalSelector = useSelector(EditLabelModalSelector);
  const toggleTodoModal = useSelector(EditTodoModalSelector);

  useEffect(() => {
    getTokenAxios(
      (res) => {
        const isValidToken = verify(
          res.accessToken,
          env.JWT_ACCESSTOKEN_PRIVATE_KEY
        );

        if (isValidToken) {
          dispatch(
            getToken({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
          );
          return;
        }

        router.push("/login", undefined, { shallow: true });
      },
      (err) => {
        if (err.response.status === 404)
          return router.push("/login", undefined, { shallow: true });

        if (err.response.status === 401) {
          refreshTokenAxios(err.response.data.refreshToken).then((res) => {
            dispatch(
              getToken({
                accessToken: res.accessToken,
                refreshToken: refreshToken,
              })
            );
          });
          return;
        }
      }
    );
  }, []);

  useEffect(() => {
    if (token.accessToken) {
      getLabelAxios(token.accessToken)
        .then((res) => {
          dispatch(getLabel(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [token.accessToken]);

  return (
    <>
      <div>
        <TodoHeader />
        <div className="mt-[59px] flex h-full items-start justify-start">
          <SideBar />
          {children}
        </div>
      </div>
      {toggleEditLabelModalSelector && <EditLabelModal />}
      {toggleTodoModal && <EditTodoModal />}
    </>
  );
}
