"use client";

import { getTodoListPin } from "@/app/GlobalRedux/Features/data/todoListPinSlider";
import { getTodoList } from "@/app/GlobalRedux/Features/data/todoListSlider";
import { getTodoListUnpin } from "@/app/GlobalRedux/Features/data/todoListUnPinSlider";
import {
  TodoListPinSelector,
  TodoListUnpinSelector,
  TokenSelector,
} from "@/app/GlobalRedux/selector";
import StickyWall from "@/components/StickyWall/StickyWall";
import { getTodoLabelAxios } from "@/service/axiosService/labelAxios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page({ params }) {
  const dispatch = useDispatch();

  const { accessToken } = useSelector(TokenSelector);

  useEffect(() => {
    if (accessToken) {
      getTodoLabelAxios(accessToken, params.labelId).then((res) => {
        dispatch(getTodoList(res.data));
      });
    }
  }, [accessToken]);

  return <StickyWall />;
}