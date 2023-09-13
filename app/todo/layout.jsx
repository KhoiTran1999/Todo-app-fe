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
import { env } from "@/config/env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TodoHeader } from "@/components/TodoHeader/TodoHeader";
import { getLabelAxios } from "@/service/axiosService/labelAxios";
import { getLabel } from "../GlobalRedux/Features/data/labelSlider";
import { EditLabelModal } from "@/components/SideBar/EditLabelModal/EditLabelModal";
import { EditTodoModal } from "@/components/StickyWall/EditTodoModal/EditTodoModal";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
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
          return setLoading(false);
        }

        router.push("/login");
      },
      (err) => {
        if (err.response.status === 404) return router.push("/login");

        if (err.response.status === 401) {
          refreshTokenAxios(err.response.data.refreshToken).then((res) => {
            dispatch(
              getToken({
                accessToken: res.accessToken,
                refreshToken: refreshToken,
              })
            );
          });
          return setLoading(false);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (token.accessToken && !loading) {
      setLoading(true);

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
        <div>
          <TodoHeader />
          <div className="mt-[59px] flex h-full items-start justify-start">
            <SideBar />
            {children}
          </div>
        </div>
      )}
      {toggleEditLabelModalSelector && <EditLabelModal />}
      {toggleTodoModal && <EditTodoModal />}
    </>
  );
}
