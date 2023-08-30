"use client";

import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import Image from "next/image";
import { verify } from "jsonwebtoken";
import { registerAxios } from "@/service/axiosService/authAxios";

export default function register({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token: rawToken } = params;
  const token = decodeURIComponent(rawToken);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    //check that user really clicked the link in their email or just random type a string on url
    try {
      const user = verify(token, env.JWT_ACCESSTOKEN_PRIVATE_KEY);

      if (!user) {
        return router.push("/verifyEmail");
      }
      setEmail(user.email);
      setLoading(false);
    } catch (error) {
      return router.push("/verifyEmail");
    }
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

    //register
    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    registerAxios(data)
      .then((res) => {
        if (res.success) {
          return router.push("/login");
        }
      })
      .catch((err) => {
        alert(`Error => ${err.response.message}`);
        router.push("/verifyEmail");
      });
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
            <FontAwesomeIcon
              icon={faUser}
              className="w-16 h-16 text-slate-700"
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
              method="post"
            >
              <input
                className="mt-9 mb-6 py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="text"
                name="username"
                placeholder="Username"
                required
                minLength={4}
                maxLength={20}
                autoFocus
              />
              <input
                className="mb-6 py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded cursor-not-allowed focus:outline-none"
                type="email"
                name="email"
                placeholder={email}
                value={email}
                readOnly
              />
              <input
                className="mb-6 py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={1}
              />
              <input
                className="py-1 px-3 text-xl text-slate-700 bg-opacity-25 placeholder-gray-400 border-gray-400 border rounded focus:outline-none"
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
                    className="w-7 h-7 text-slate-700"
                    spin={true}
                  />
                ) : (
                  <button className="text-base font-medium py-2 px-3 w-full text-slate-700 text-center bg-yellow-400 hover:bg-yellow-500 rounded  ease-out duration-300">
                    Register
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}