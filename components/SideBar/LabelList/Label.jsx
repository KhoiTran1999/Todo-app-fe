import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { toggleAxiosLoading } from '@/app/GlobalRedux/Features/toggle/axiosLoadingSlider';
import { toggleDeletedSearchIcon } from '@/app/GlobalRedux/Features/toggle/deletedSearchIconSlider';
import { toggleSidebar } from '@/app/GlobalRedux/Features/toggle/sidebarSlider';
import { SidebarSelector } from '@/app/GlobalRedux/selector';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export const Label = ({ id, name }) => {
  const pathname = usePathname();
  const toggle = useSelector(SidebarSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleAxiosLoading(true));
    dispatch(getTodoList([]));
    dispatch(toggleSidebar(false));
    dispatch(toggleDeletedSearchIcon(false));
  };

  return (
    <Link
      onClick={handleClick}
      href={`/todo/${id}`}
      shallow={true}
      className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
        !toggle ? 'rounded-full' : 'rounded-r-full'
      } cursor-pointer ${
        pathname === `/todo/${id}`
          ? 'bg-blue-200'
          : 'hover:bg-white bg-white xl:hover:bg-slate-100'
      } transition-all`}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        className="w-5 h-5 mr-8 text-[#164B60]"
      />
      <p className={`font-medium ${!toggle && 'hidden'}`}>{name}</p>
    </Link>
  );
};
