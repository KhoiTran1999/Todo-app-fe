import { getLimit } from '@/app/GlobalRedux/Features/data/limitSlider';
import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { getToken } from '@/app/GlobalRedux/Features/data/tokenSlider';
import { toggleAxiosLoading } from '@/app/GlobalRedux/Features/toggle/axiosLoadingSlider';
import { toggleDeletedSearchIcon } from '@/app/GlobalRedux/Features/toggle/deletedSearchIconSlider';
import { toggleSidebar } from '@/app/GlobalRedux/Features/toggle/sidebarSlider';
import { toggleviewMode } from '@/app/GlobalRedux/Features/toggle/viewModeSlider';
import {
  DeletedSearchIconSelector,
  LimitSelector,
  TokenSelector,
} from '@/app/GlobalRedux/selector';
import { useDebounce } from '@/hooks/useDebounce';
import { clearTokenAxios } from '@/service/axiosService/authAxios';
import { getSearchTodoAxios } from '@/service/axiosService/todoAxios';
import {
  faArrowRightFromBracket,
  faBars,
  faListUl,
  faMagnifyingGlass,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';

export const TodoHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { accessToken } = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);
  const deletedIcon = useSelector(DeletedSearchIconSelector);

  const [searchValue, setSearchValue] = useState('');

  const searchDebounce = useDebounce(searchValue, 600);

  useEffect(() => {
    const getData = async () => {
      const res = await getSearchTodoAxios(accessToken, searchDebounce, limit);
      dispatch(getTodoList(res.data));
    };

    if (accessToken && pathname === '/todo/search') {
      getData();
    }
  }, [searchDebounce]);

  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    clearTokenAxios()
      .then((res) => {
        router.push('/login', undefined, { shallow: 'true' });
        dispatch(getToken({}));
      })
      .catch((err) => console.log(err));
  };

  const handleViewMode = () => {
    dispatch(toggleviewMode());
  };

  const handleFocus = () => {
    dispatch(toggleDeletedSearchIcon(true));
    router.push('/todo/search', undefined, { shallow: 'true' });
  };

  const handleDeleteSearch = () => {
    setSearchValue('');
    dispatch(toggleDeletedSearchIcon(false));
  };

  const handleBackToMain = () => {
    if (pathname === `/todo/today`) {
      dispatch(toggleSidebar(false));
      return dispatch(toggleDeletedSearchIcon(false));
    }
    dispatch(toggleAxiosLoading(true));
    router.push('/todo/today', undefined, { shallow: 'true' });
    dispatch(getTodoList([]));
    dispatch(getLimit(10));
    dispatch(toggleSidebar(false));
    dispatch(toggleDeletedSearchIcon(false));
  };

  return (
    <div className="px-4 py-1 bg-white z-[1000] border-b border-b-slate-300 flex justify-between items-center fixed top-0 left-0 right-0">
      <div className="flex items-center cursor-pointer">
        <FontAwesomeIcon
          onClick={handleSidebar}
          icon={faBars}
          className="w-5 h-5 p-3 mr-4 text-[#164B60] hover:bg-slate-100 cursor-pointer rounded-full"
        />
        <img
          onClick={handleBackToMain}
          className="w-8 h-8 mr-4 hidden sm:inline-block"
          src="/favicon/favicon.ico"
          alt=""
        />
        <h1
          onClick={handleBackToMain}
          className="text-xl font-bold text-slate-500 hidden sm:inline-block"
        >
          Fast Note
        </h1>
      </div>

      <div className="w-1/2 p-1 bg-slate-100 rounded-xl relative">
        <form
          onSubmit={(e) => e.preventDefault()}
          action="addTodo"
          className="w-full flex justify-start items-center"
        >
          <label htmlFor="search">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="w-4 h-4 p-3 max-[768px]:p-1 -mb-[2px] mx-3 text-slate-700 hover:bg-slate-300 rounded-full cursor-pointer"
            />
          </label>
          <input
            onFocus={handleFocus}
            className=" w-full bg-transparent outline-none max-[321px]:text-sm"
            id="search"
            type="search"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        {deletedIcon && (
          <Link href={'/todo/today'} shallow={true}>
            <FontAwesomeIcon
              onClick={handleDeleteSearch}
              icon={faX}
              className="w-4 h-4 px-2 py-[7px] text-slate-700 bg-slate-100 hover:bg-slate-300 rounded-full cursor-pointer absolute right-0 top-1/2 -translate-y-1/2"
            />
          </Link>
        )}
      </div>

      <div>
        <FontAwesomeIcon
          id="viewMode"
          onClick={handleViewMode}
          icon={faListUl}
          className="w-4 h-4 p-3 text-slate-700 hover:bg-slate-300 rounded-full outline-none cursor-pointer hidden md:inline-block"
        />
        <Tooltip anchorSelect="#viewMode" place="bottom" opacity={0.9}>
          Chuyển chế độ xem
        </Tooltip>

        <Link href="/" shallow={true}>
          <FontAwesomeIcon
            id="logout"
            onClick={handleLogout}
            icon={faArrowRightFromBracket}
            className="w-4 h-4 p-3 text-slate-700 hover:bg-slate-300 rounded-full cursor-pointer"
          />
        </Link>
        <Tooltip anchorSelect="#logout" place="bottom" opacity={0.9}>
          Đăng xuất
        </Tooltip>
      </div>
    </div>
  );
};
