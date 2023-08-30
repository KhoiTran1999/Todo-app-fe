import { getToken } from "@/app/GlobalRedux/Features/data/tokenSlider";
import { toggleSidebar } from "@/app/GlobalRedux/Features/toggle/sidebarSlider";
import { toggleviewMode } from "@/app/GlobalRedux/Features/toggle/viewModeSlider";
import { clearTokenAxios } from "@/service/axiosService/authAxios";
import {
  faArrowRightFromBracket,
  faBars,
  faListUl,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";

export const TodoHeader = () => {
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    clearTokenAxios().then((res) => {
      dispatch(getToken({}));
    });
  };

  const handleViewMode = () => {
    dispatch(toggleviewMode());
  };

  return (
    <div className="px-4 py-1 bg-white z-[1000] border-b border-b-slate-300 flex justify-between items-center fixed top-0 left-0 right-0">
      <div className="flex items-center">
        <FontAwesomeIcon
          onClick={handleSidebar}
          icon={faBars}
          className="w-5 h-5 p-3 mr-4 text-[#164B60] hover:bg-slate-100 cursor-pointer rounded-full"
        />
        <img className="w-8 h-8 mr-4" src="/favicon/favicon.ico" alt="" />
        <h1 className="text-xl font-bold text-slate-500">Fast Note</h1>
      </div>

      <div className="w-1/2 p-1 bg-slate-100 rounded-xl">
        <form action="addTodo" className="flex justify-start items-center">
          <label htmlFor="search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-4 h-4 p-3 -mb-[2px] mx-3 text-slate-700 hover:bg-slate-300 rounded-full cursor-pointer"
            />
          </label>
          <input
            className=" w-full bg-transparent outline-none"
            id="search"
            type="search"
            placeholder="Tìm kiếm"
          />
        </form>
      </div>

      <div>
        <FontAwesomeIcon
          onClick={handleViewMode}
          icon={faListUl}
          className="w-4 h-4 p-3 text-slate-700 hover:bg-slate-300 rounded-full cursor-pointer"
        />
        <FontAwesomeIcon
          onClick={handleLogout}
          icon={faArrowRightFromBracket}
          className="w-4 h-4 p-3 text-slate-700 hover:bg-slate-300 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
