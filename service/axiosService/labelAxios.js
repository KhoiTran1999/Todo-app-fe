import env from '@/config/env';
import axios from 'axios';

const getLabelAxios = async (token) => {
  const res = await axios.get(`${env.SERVER_URL}/api/v1/label`, {
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const addLabelAxios = async (token, data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(`${env.SERVER_URL}/api/v1/label`, JSONdata, {
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const deleteLabelAxios = async (
  token,
  id,
  fulfilledHandling,
  rejectHandling,
) => {
  await axios
    .delete(`${env.SERVER_URL}/api/v1/label/${id}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => await fulfilledHandling(res.data))
    .catch(async (err) => await rejectHandling(err));
};

const updateLabelAxios = async (
  token,
  id,
  data,
  fulfillHandling,
  rejectHandling,
) => {
  const JSONdata = JSON.stringify(data);
  await axios
    .patch(`${env.SERVER_URL}/api/v1/label/${id}`, JSONdata, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => await fulfillHandling(res.data))
    .catch(async (err) => await rejectHandling());
};

const addTodoLabelAxios = async (token, data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(
    `${env.SERVER_URL}/api/v1/label/todoLabel`,
    JSONdata,
    {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const deleteTodoLabelAxios = async (token, todoId, labelId) => {
  const res = await axios.delete(
    `${env.SERVER_URL}/api/v1/label/todoLabel/${todoId}/${labelId}`,
    {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const getTodoLabelAxios = async (token, id) => {
  const res = await axios.get(
    `${env.SERVER_URL}/api/v1/label/todoLabel/${id}`,
    {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export {
  getLabelAxios,
  addLabelAxios,
  deleteLabelAxios,
  updateLabelAxios,
  addTodoLabelAxios,
  deleteTodoLabelAxios,
  getTodoLabelAxios,
};
