"use client";

import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import { useGetToken } from "@/service/axiosService";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

const FirstRender = ({ children }) => {
  const { data, error, isloading } = useGetToken();
  const dispatch = useDispatch();

  if (isloading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FontAwesomeIcon
          icon={faSpinner}
          className="w-16 h-16 text-slate-700"
          spin={true}
        />
      </div>
    );

  if (data)
    dispatch(
      getToken({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    );

  if (error) console.log(error);

  return <>{children}</>;
};

export default FirstRender;
