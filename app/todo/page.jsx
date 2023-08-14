"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Todo() {
  const router = useRouter();
  const token = useSelector((state) => state.token.value);

  console.log(token);
  useEffect(() => {
    if (!token) {
      router.push("/verifyEmail");
    }
  }, []);

  return (
    <>
      {token ? (
        <div className="flex min-h-screen items-center justify-between p-24">
          hello todo
        </div>
      ) : (
        <p className="flex min-h-screen items-center justify-center text-lg">
          Please register to use todo-app
        </p>
      )}
    </>
  );
}
