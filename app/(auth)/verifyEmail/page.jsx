"use client";

import { env } from "@/config/env";
import { faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

export default function verifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isResendEmail, setIsResendEmail] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      email: e.target.email.value,
    };

    const JSONdata = JSON.stringify(data);
    axios
      .post(`${env.SERVER_URL}/api/v1/auth/verifyEmail`, JSONdata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsSendEmail(true);
        setTimeout(() => {
          setIsResendEmail(true);
          setIsLoading(false);
        }, 10000);
      })
      .catch((err) => {
        alert(`Error => ${err.response.data.message}`);
        setIsLoading(false);
      });
  };

  const handleResentEmail = async (e) => {
    setIsLoading(true);
    handleOnSubmit(e);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FontAwesomeIcon icon={faUser} className="w-16 h-16 text-slate-300" />
      <form
        onSubmit={(handleOnSubmit, handleResentEmail)}
        className="flex flex-col items-center justify-center"
        id="formEmail"
      >
        {isSendEmail && !isResendEmail ? (
          <p className="my-5">
            A link have been sent to your email for verification.{" "}
            <strong>This link is only valid for the next 1 minute</strong>
          </p>
        ) : (
          <>
            <label htmlFor="otp" className="text-xl mt-7 mb-5">
              Enter your email here:
            </label>
          </>
        )}

        <input
          className="py-1 px-3 text-xl text-white bg-white bg-opacity-25 placeholder-slate-300 rounded focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength={1}
          autoFocus
        />

        {isResendEmail ? (
          <p className="mt-5">
            The link that have been sent to your email was invalid.{" "}
            <strong>Please click button below to get new link</strong>
          </p>
        ) : (
          <></>
        )}

        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="w-7 h-7 mt-5 mr-5 text-slate-300"
            spin={true}
          />
        ) : (
          <>
            {isResendEmail ? (
              <button className="text-xl border py-1 px-3 mt-8 rounded hover:bg-blue-500 hover:border-blue-500 ease-out duration-300">
                Resend Email
              </button>
            ) : (
              <button className="text-xl border py-1 px-3 mt-8 rounded hover:bg-blue-500 hover:border-blue-500 ease-out duration-300">
                Verify
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}
