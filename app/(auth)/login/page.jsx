"use client";

import { getToken } from "@/app/GlobalRedux/Features/counter/tokenSlider";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3200/api/v1/auth/cookie/getToken", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.accessToken) {
          dispatch(getToken(res.data.accessToken));
          return router.push("/todo");
        }

        if (res.data.refreshToken) {
          return router.push("/");
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "http://localhost:3200/api/v1/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.success) {
      return router.push("/todo");
    }

    alert(`Error => ${result.message}`);
    e.target.password.value = "";
    setIsLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex min-h-screen min-w-full items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-16 h-16 text-slate-300"
            spin={true}
          />
        </div>
      ) : (
        <div className="flex min-h-screen min-w-full items-center justify-center">
          <div className="w-2/5 p-4 mr-20 min-h-screen flex items-center justify-center">
            <Image
              src="/static/img/login.jpg"
              className="rounded-lg"
              width={600}
              height={400}
              alt="Main picture"
            ></Image>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="w-16 h-16 text-gray-700"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <input
                className="mt-9 mb-6 py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                required
                autoFocus
              />
              <input
                className="py-1 px-3 text-xl text-black bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                minLength={1}
                required
              />
              <div className="w-full mt-5 flex justify-center items-center">
                {isLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="w-7 h-7 mr-5 text-slate-600"
                    spin={true}
                  />
                ) : (
                  <button className="text-lg font-semibold py-2 px-3 w-full text-slate-600 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                    Sign in
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8 w-full pt-2 text-center border-t border-slate-600">
              <Link
                href={"/verifyEmail"}
                className="font-semibold text-slate-600 hover:underline"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
