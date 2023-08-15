"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "./GlobalRedux/Features/counter/tokenSlider";
import { useRouter } from "next/navigation";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3200/api/v1/auth/cookie/getToken", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (!res.data.accessToken) {
          return;
        }
        const isValidAccessToken = verify(
          res.data.accessToken,
          env.JWT_ACCESSTOKEN_PRIVATE_KEY
        );
        if (isValidAccessToken) {
          router.push("/todo");
          dispatch(getToken(res.data.accessToken));
        } else {
          const JSONdata = JSON.stringify({
            refreshToken: res.data.refreshToken,
          });
          axios
            .post(
              "http://localhost:3200/api/v1/auth/cookie/refreshToken",
              JSONdata,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              dispatch(getToken(res.data.accessToken));
            })
            .catch((err) => {
              router.push("/login");
            });
        }
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl">Welcome to Todo-app</h1>
      <div className="mt-10">
        <Link
          href="/login"
          className="text-xl hover:bg-blue-500 py-1 mr-5 px-3 border hover:border-blue-500 rounded  ease-out duration-300"
        >
          Login
        </Link>
        <Link
          href="/verifyEmail"
          className="text-xl hover:bg-blue-500 py-1 px-3 border hover:border-blue-500 rounded  ease-out duration-300"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
