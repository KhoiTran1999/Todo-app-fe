import { env } from "@/config/env";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

const useGetTodo = (token) => {
  const fetcher = (url) =>
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  return useSWRImmutable("http://localhost:3200/api/v1/todo", fetcher);
};

const addTodoAxios = async (token, data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post("http://localhost:3200/api/v1/todo", JSONdata, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const deleteTodoAxios = async (token, id) => {
  const res = await axios.delete(
    `http://localhost:3200/api/v1/todo/${id}`,
    JSONdata,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
const updateTodoAxios = async (token, id, data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.patch(
    `http://localhost:3200/api/v1/todo/${id}`,
    JSONdata,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export { useGetTodo, addTodoAxios, deleteTodoAxios, updateTodoAxios };
