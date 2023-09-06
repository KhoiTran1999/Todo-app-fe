import { SidebarSelector } from "@/app/GlobalRedux/selector";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const Label = ({ id, name }) => {
  const router = useRouter();
  const pathname = usePathname();
  const toggle = useSelector(SidebarSelector);

  const handleClickLabel = () => {
    router.push(`/todo/${id}`);
  };

  return (
    <div
      onClick={handleClickLabel}
      className={`py-3 pl-6 h-[48px] flex justify-start items-center w-ful ${
        !toggle ? "rounded-full" : "rounded-r-full"
      } cursor-pointer ${
        pathname === `/todo/${id}` ? "bg-blue-200" : "hover:bg-slate-100"
      } transition-all`}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        className="w-5 h-5 mr-8 text-[#164B60]"
      />
      <p className={`font-medium ${!toggle && "hidden"}`}>{name}</p>
    </div>
  );
};
