"use client";

import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import { TokenSelector } from "@/app/GlobalRedux/selector";
import { loginAxios } from "@/service/axiosService";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = useSelector(TokenSelector);

  useEffect(() => {
    setLoading(true);

    if (token.accessToken && token.refreshToken)
      return router.push("/todo/today");

    setLoading(false);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    loginAxios(data)
      .then((res) => {
        dispatch(
          getToken({
            accessToken: res.token.accessToken,
            refreshToken: res.token.refreshToken,
          })
        );
        return router.push("/todo/today");
      })
      .catch((err) => {
        alert(`Error => ${err.response.data.message}`);
        e.target.password.value = "";
        setIsLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex min-h-screen min-w-full items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-16 h-16 text-slate-700"
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
                className="w-16 h-16 text-slate-700"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <input
                className="mt-9 mb-6 py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                required
                autoFocus
              />
              <input
                className="py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
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
                    className="w-7 h-7 mr-5 text-slate-700"
                    spin={true}
                  />
                ) : (
                  <button className="text-base font-semibold py-2 px-3 w-full text-slate-700 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                    Sign in
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8 w-full pt-2 text-center border-t border-slate-400">
              <Link
                href={"/verifyEmail"}
                className="text-base font-semibold text-slate-700 hover:underline"
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
