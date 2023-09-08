import { env } from "@/config/env";
import axios from "axios";

const getTodoAxios = async (token) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/todo`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getArchiveTodoAxios = async (token) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/todo/archive`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getDeletedTodoAxios = async (token) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/todo/trash`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getAllTodoAxios = async (token) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/todo/all`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const addTodoAxios = async (token, data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(`${env.SERVER_URL}/api/v1/todo`, JSONdata, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const deleteTodoAxios = async (token, id) => {
  const res = await axios.delete(`${env.SERVER_URL}/api/v1/todo/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const deletePermanentTodoAxios = async (token, id) => {
  const res = await axios.delete(
    `${env.SERVER_URL}/api/v1/todo/permanent/${id}`,
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
    `${env.SERVER_URL}/api/v1/todo/${id}`,
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

const restoreTodoAxios = async (token, id) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/todo/restore/${id}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export {
  getTodoAxios,
  getArchiveTodoAxios,
  getDeletedTodoAxios,
  getAllTodoAxios,
  deletePermanentTodoAxios,
  addTodoAxios,
  deleteTodoAxios,
  updateTodoAxios,
  restoreTodoAxios,
};
