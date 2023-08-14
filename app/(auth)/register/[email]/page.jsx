"use client";

import {
  faArrowLeftLong,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getToken } from "@/app/GlobalRedux/Features/counter/tokenSlider";

export default function register({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = params;
  const encodeEmail = decodeURIComponent(email);

  useEffect(() => {
    // setToken();
    axios
      .get(`${env.SERVER_URL}/api/v1/auth/cookie/setToken`, {
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (e.target.password.value !== e.target.confirmPassword.value) {
      e.target.password.value = "";
      e.target.confirmPassword.value = "";
      setIsLoading(false);
      return alert("Password didn't match");
    }

    // getToken();
    axios
      .get(`${env.SERVER_URL}/api/v1/auth/cookie/getToken`, {
        withCredentials: true,
      })
      .then((res) => {
        const token = res.data.cookies.token;
        const data = {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        };

        const JSONdata = JSON.stringify(data);
        axios
          .post(`${env.SERVER_URL}/api/v1/auth/register`, JSONdata, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              dispatch(getToken(token));
              router.push("/todo");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-slate-300" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
        method="post"
      >
        <input
          className="mt-9 mb-6 py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-slate-300 rounded focus:outline-none"
          type="text"
          name="username"
          placeholder="Username"
          required
          minLength={4}
          maxLength={20}
          autoFocus
        />
        <input
          className="mb-6 py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-slate-300 rounded focus:outline-none"
          type="email"
          name="email"
          placeholder={encodeEmail}
          value={encodeEmail}
          readOnly
        />
        <input
          className="mb-6 py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-slate-300 rounded focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={1}
        />
        <input
          className="py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-slate-300 rounded focus:outline-none"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          minLength={1}
        />
        <div className="w-full mt-5 flex justify-between items-center">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="w-10 h-10 text-slate-300 hover:text-slate-50 ease-out duration-300 cursor-pointer"
            onClick={() => router.push("/verifyEmail")}
          />
          {isLoading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-7 h-7 mr-5 text-slate-300"
              spin={true}
            />
          ) : (
            <button className="text-xl border py-1 px-3 rounded hover:bg-blue-500 hover:border-blue-500 ease-out duration-300">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
