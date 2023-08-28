import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import { clearTokenAxios } from "@/service/axiosService";
import { faSignOut, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

const Footer = () => {
  const dispatch = useDispatch();

  const handleClearToken = () => {
    clearTokenAxios()
      .then((res) => {
        dispatch(getToken({}));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full ">
      <div className="p-2 hover:bg-slate-300 flex justify-start items-center cursor-pointer rounded">
        <div className="flex justify-center items-center mr-3">
          <FontAwesomeIcon
            icon={faSliders}
            className="w-4 h-4 text-slate-700"
          />
        </div>
        <span className=" font-semibold text-slate-700">Settings</span>
      </div>
      <div
        onClick={handleClearToken}
        className="p-2 flex hover:bg-slate-300 justify-start items-center cursor-pointer rounded"
      >
        <div className="flex justify-center items-center mr-3">
          <FontAwesomeIcon
            icon={faSignOut}
            className="w-4 h-4 text-slate-700"
          />
        </div>
        <span className=" font-semibold text-slate-700">Sign out</span>
      </div>
    </div>
  );
};

export default Footer;
