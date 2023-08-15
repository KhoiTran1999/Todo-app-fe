"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "./GlobalRedux/Features/counter/tokenSlider";
import { useRouter } from "next/navigation";
import { verify } from "jsonwebtoken";
import { env } from "@/config/env";
import Image from "next/image";

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
              if (!res.success) {
                return router.push("/login");
              }

              dispatch(getToken(res.data.accessToken));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }, []);

  return (
    <main className="flex min-h-screen min-w-full items-center justify-center ">
      <div className="w-2/5 p-4 mr-20 min-h-screen flex items-center justify-center">
        <Image
          src="/static/img/home.jpg"
          className="rounded-lg"
          width={600}
          height={400}
          alt="Main picture"
        ></Image>
      </div>
      <div>
        <h1 className="text-5xl font-bold text-black text-center">
          Free your mind
        </h1>
        <p className="font-medium text-black my-8">
          Simplify, Be Inspired, Be Original, Work Hard, Enjoy
        </p>
        <div className="flex flex-col">
          <Link
            href="/verifyEmail"
            className="text-lg py-2 px-3 text-black text-center bg-yellow-400 hover:bg-yellow-500 font-semibold rounded  ease-out duration-300"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="text-base font-semibold text-gray-800 text-center mt-3 hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
