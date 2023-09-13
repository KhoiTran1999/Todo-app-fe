import { toggleEditLabelModal } from "@/app/GlobalRedux/Features/toggle/editLabelModalSlider";
import { LabelSelector, SidebarSelector } from "@/app/GlobalRedux/selector";
import {
  faBell,
  faBookmark,
  faBoxArchive,
  faLightbulb,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "./LabelList/Label";
import { usePathname, useRouter } from "next/navigation";
import { getLimit } from "@/app/GlobalRedux/Features/data/limitSlider";

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const toggle = useSelector(SidebarSelector);
  const labelList = useSelector(LabelSelector);

  const handleModal = () => {
    dispatch(toggleEditLabelModal(true));
  };

  return (
    <div
      className={`${
        toggle ? "w-[300px]" : "w-[70px]"
      } h-screen py-3 bg-white fixed top-0 left-0 right-0 mt-[59px] hover:shadow z-[100] transition-all overflow-hidden hover:overflow-y-auto overscroll-none`}
    >
      <div
        onClick={() => {
          dispatch(getLimit(10));
          router.push("/todo/today");
        }}
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-full ${
          pathname === "/todo/today" ? "bg-blue-200" : "hover:bg-slate-100"
        } ${!toggle ? "rounded-full" : "rounded-r-full"} cursor-pointer`}
      >
        <FontAwesomeIcon
          icon={faLightbulb}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Ghi chú</p>
      </div>
      <div
        onClick={() => {
          dispatch(getLimit(10));
          router.push("/todo/reminder");
        }}
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer ${
          pathname === "/todo/reminder" ? "bg-blue-200" : "hover:bg-slate-100"
        } transition-all`}
      >
        <FontAwesomeIcon
          icon={faBell}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Lời nhắc</p>
      </div>
      {labelList.map((val) => (
        <Label key={val.id} id={val.id} name={val.name} />
      ))}
      <div
        onClick={handleModal}
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer hover:bg-slate-100 transition-all`}
      >
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Chỉnh sửa nhãn</p>
      </div>
      <div
        onClick={() => {
          dispatch(getLimit(10));
          router.push("/todo/archive");
        }}
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer ${
          pathname === "/todo/archive" ? "bg-blue-200" : "hover:bg-slate-100"
        } transition-all`}
      >
        <FontAwesomeIcon
          icon={faBoxArchive}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Lưu trữ</p>
      </div>
      <div
        onClick={() => router.push("/todo/trash")}
        className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
          !toggle ? "rounded-full" : "rounded-r-full"
        } cursor-pointer ${
          pathname === "/todo/trash" ? "bg-blue-200" : "hover:bg-slate-100"
        } transition-all`}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          className="w-5 h-5 mr-8 text-[#164B60]"
        />
        <p className={`font-medium ${!toggle && "hidden"}`}>Thùng rác</p>
      </div>
    </div>
  );
};

export default SideBar;
