"use client";

import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { TokenSelector } from "@/app/GlobalRedux/selector";
import StickyWall from "@/components/StickyWall/StickyWall";
import { getDeletedTodoAxios } from "@/service/axiosService/todoAxios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Todo() {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);

  useEffect(() => {
    if (accessToken) {
      getDeletedTodoAxios(accessToken).then((res) => {
        dispatch(getTodoList(res.data));
      });
    }
  }, [accessToken]);

  return <StickyWall />;
}
