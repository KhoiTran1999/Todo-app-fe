"use client";

import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { LimitSelector, TokenSelector } from "@/app/GlobalRedux/selector";
import StickyWall from "@/components/StickyWall/StickyWall";
import { getAllTodoAxios } from "@/service/axiosService/todoAxios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Todo() {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);

  useEffect(() => {
    dispatch(getTodoList([]));
  }, []);

  useEffect(() => {
    if (accessToken) {
      getAllTodoAxios(accessToken, limit).then((res) =>
        dispatch(getTodoList(res.data))
      );
    }
  }, [accessToken]);

  return <StickyWall />;
}
