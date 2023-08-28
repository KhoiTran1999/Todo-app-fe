import { useDispatch, useSelector } from "react-redux";
import HeaderSideBar from "./Header/HeaderSideBar";
import { SidebarSelector } from "@/app/GlobalRedux/selector";
import Tasks from "./Tasks/Tasks";
import Lists from "./Lists/Lists";
import Footer from "./Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { toggleSidebar } from "@/app/GlobalRedux/Features/toggle/sidebarSlider";

const SideBar = () => {
  const isSidebar = useSelector(SidebarSelector);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {isSidebar ? (
        <div
          className={`flex flex-col justify-between items-start py-4 px-3 h-full w-1/5 bg-slate-100 rounded-2xl overflow-hidden hover:overflow-y-auto`}
        >
          <div className="flex flex-col justify-start items-start h-full w-full bg-slate-100 rounded-2xl overflow-hidden hover:overflow-y-auto">
            <HeaderSideBar />
            <Tasks />
            <Lists />
          </div>
          <Footer />
        </div>
      ) : (
        <div onClick={handleSidebar} className="cursor-pointer relative top-0">
          <FontAwesomeIcon icon={faBars} className="w-7 h-7 text-slate-500" />
        </div>
      )}
    </>
  );
};

export default SideBar;
