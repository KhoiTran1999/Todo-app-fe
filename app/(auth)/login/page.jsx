"use client";

import {
  faArrowLeftLong,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
      console.log(result.token);
      return router.push("/todo");
    }

    alert(`Error => ${result.message}`);
    e.target.password.value = "";
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <i className="fa-regular fa-user text-5xl"></i>
      <FontAwesomeIcon icon={faUser} className="w-16 h-16" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          className="mt-9 mb-6 py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-white rounded focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
          autoFocus
        />
        <input
          className="py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-white rounded focus:outline-none"
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
              className="w-7 h-7 mr-5 text-slate-300"
              spin={true}
            />
          ) : (
            <button className="text-xl border py-1 px-3 rounded hover:bg-blue-500 hover:border-blue-500 ease-out duration-300">
              Sign in
            </button>
          )}
        </div>
      </form>
      <div className="mt-8">
        <Link href={"/"} className="hover:underline">
          Forgotten password?
        </Link>
      </div>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        className="w-10 h-10 mt-10 text-slate-300 hover:text-slate-50 ease-out duration-300 cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  );
}
