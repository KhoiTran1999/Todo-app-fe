import { toggleSidebar } from "@/app/GlobalRedux/Features/toggle/sidebarSlider";
import { SidebarSelector } from "@/app/GlobalRedux/selector";
import { faBell, faLightbulb, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(SidebarSelector);

  return (
    <div
      className={`${
        toggle ? "w-[300px]" : "w-[70px]"
      } h-screen py-3 bg-white fixed top-0 left-0 right-0 mt-[59px] hover:shadow z-[100] transition-all`}
    >
      <div
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-full bg-blue-200 ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer`}
      >
        <FontAwesomeIcon
          icon={faLightbulb}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Ghi chú</p>
      </div>
      <div
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer hover:bg-slate-100 transition-all`}
      >
        <FontAwesomeIcon
          icon={faBell}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Lời nhắc</p>
      </div>
      <div
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer hover:bg-slate-100 transition-all`}
      >
        <FontAwesomeIcon icon={faTag} className="w-5 h-5 mr-8 text-[#164B60]" />
        <p className={`font-medium ${!toggle && "hidden"}`}>Business</p>
      </div>
      <div
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer hover:bg-slate-100 transition-all`}
      >
        <FontAwesomeIcon icon={faTag} className="w-5 h-5 mr-8 text-[#164B60]" />
        <p className={`font-medium ${!toggle && "hidden"}`}>Bất động sản</p>
      </div>
      <div
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer hover:bg-slate-100 transition-all`}
      >
        <FontAwesomeIcon icon={faTag} className="w-5 h-5 mr-8 text-[#164B60]" />
        <p className={`font-medium ${!toggle && "hidden"}`}>Ielts</p>
      </div>
    </div>
  );
};

export default SideBar;
