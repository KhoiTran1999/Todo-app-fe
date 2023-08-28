import { toggleSidebar } from "@/app/GlobalRedux/Features/toggle/sidebarSlider";
import { SidebarSelector } from "@/app/GlobalRedux/selector";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

const HeaderSideBar = () => {
  const dispatch = useDispatch();
  const isSidebar = useSelector(SidebarSelector);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="w-full mb-5 flex justify-between items-center">
      <h2 className="text-3xl font-semibold text-slate-700">Menu</h2>

      <div onClick={handleSidebar} className="cursor-pointer">
        <FontAwesomeIcon icon={faBars} className="w-7 h-7 text-slate-500" />
      </div>
    </div>
  );
};

export default HeaderSideBar;
