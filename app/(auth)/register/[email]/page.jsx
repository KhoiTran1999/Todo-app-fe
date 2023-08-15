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
import Image from "next/image";
import Link from "next/link";

export default function register({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = params;
  const encodeEmail = decodeURIComponent(email);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setToken();

    const JSONdata = JSON.stringify({ email: encodeEmail });
    axios
      .post(`${env.SERVER_URL}/api/v1/auth/cookie/setToken`, JSONdata, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

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
        const token = res.data.accessToken;
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
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <div className="w-2/5 p-4 mr-3 min-h-screen flex items-center justify-center">
        <Image
          src="/static/img/register.jpg"
          className="rounded-lg"
          width={600}
          height={400}
          alt="Main picture"
        ></Image>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-gray-700" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
          method="post"
        >
          <input
            className="mt-9 mb-6 py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
            type="text"
            name="username"
            placeholder="Username"
            required
            minLength={4}
            maxLength={20}
            autoFocus
          />
          <input
            className="mb-6 py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded cursor-not-allowed focus:outline-none"
            type="email"
            name="email"
            placeholder={encodeEmail}
            value={encodeEmail}
            readOnly
          />
          <input
            className="mb-6 py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={1}
          />
          <input
            className="py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            minLength={1}
          />
          <div className="w-full mt-5 flex justify-between items-center">
            {isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-7 h-7 mr-5 text-slate-300"
                spin={true}
              />
            ) : (
              <button className="text-lg font-semibold py-2 px-3 w-full text-slate-600 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                Register
              </button>
            )}
          </div>
        </form>
        <div className="mt-8 w-full pt-2 text-center border-t border-slate-600">
          <Link
            href="/login"
            className="text-base font-semibold text-gray-800 text-center mt-3 hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
