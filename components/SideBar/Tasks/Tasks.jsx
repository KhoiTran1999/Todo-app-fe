import {
  faAngleDoubleRight,
  faCalendarDays,
  faListCheck,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tasks = () => {
  return (
    <div className="w-full mb-5 border-b border-slate-300 pb-4">
      <h3 className="text-sm font-semibold mb-3">TASKS</h3>
      <ul className="">
        <li className="p-2 flex justify-between items-center hover:bg-slate-300 rounded cursor-pointer">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center mr-3">
              <FontAwesomeIcon
                icon={faAngleDoubleRight}
                className="w-4 h-4 text-slate-700"
              />
            </div>
            <h4 className="text-sm font-semibold text-slate-700">Upcoming</h4>
          </div>
          <span className="text-xs text-slate-700 font-semibold bg-slate-300 px-1 rounded">
            12
          </span>
        </li>
        <li className="p-2 flex justify-between items-center hover:bg-slate-300 rounded cursor-pointer">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center mr-3">
              <FontAwesomeIcon
                icon={faListCheck}
                className="w-4 h-4 text-slate-700"
              />
            </div>
            <h4 className="text-sm font-semibold text-slate-700">Today</h4>
          </div>
          <span className="text-xs text-slate-700 font-semibold bg-slate-300 px-1 rounded">
            12
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Tasks;
