"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "./GlobalRedux/Features/counter/tokenSlider";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3200/api/v1/auth/cookie/getToken", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.cookies.token) {
          router.push("/todo");
        }
        dispatch(getToken(res.data.cookies.token));
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
