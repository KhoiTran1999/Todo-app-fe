"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../GlobalRedux/Features/counter/tokenSlider";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Todo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);
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
        if (!res.data.accessToken) {
          return router.push("/");
        }
        dispatch(getToken(res.data.accessToken));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex h-screen w-screen justify-center items-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-16 h-16 text-gray-600"
            spin={true}
          />
        </div>
      ) : (
        <>
          {token ? (
            <div className="text-gray-600 flex min-h-screen items-center justify-between p-24">
              hello todo
            </div>
          ) : (
            <p className="text-gray-600 flex min-h-screen items-center justify-center text-lg">
              Please register to use todo-app
            </p>
          )}
        </>
      )}
    </div>
  );
}
