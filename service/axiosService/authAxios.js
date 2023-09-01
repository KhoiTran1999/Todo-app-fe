import { env } from "@/config/env";
import axios from "axios";
import useSWRImmutable from "swr/immutable";

const loginAxios = async (data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(
    `${env.SERVER_URL}/api/v1/auth/login`,
    JSONdata,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

const verifyEmailAxios = async (data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(
    `${env.SERVER_URL}/api/v1/auth/verifyEmail`,
    JSONdata,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

const registerAxios = async (data) => {
  const JSONdata = JSON.stringify(data);
  const res = await axios.post(
    `${env.SERVER_URL}/api/v1/auth/register`,
    JSONdata,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

const useGetToken = () => {
  const fetcher = (url) =>
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  return useSWRImmutable(
    `${env.SERVER_URL}/api/v1/auth/cookie/getToken`,
    fetcher
  );
};

const refreshTokenAxios = async (token) => {
  const res = await axios.get(
    `${env.SERVER_URL}/api/v1/auth/cookie/refreshToken`,
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

const clearTokenAxios = async () => {
  const res = await axios.delete(
    `${env.SERVER_URL}/api/v1/auth/cookie/clearToken`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export {
  loginAxios,
  verifyEmailAxios,
  registerAxios,
  refreshTokenAxios,
  clearTokenAxios,
  useGetToken,
};

//Example using Authorization
// const registerAxios = async (token, data) => {
//   const JSONdata = JSON.stringify(data);
//   const res = await axios.post(
//     `${env.SERVER_URL}/api/v1/auth/register`,
//     JSONdata,
//     {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// };
