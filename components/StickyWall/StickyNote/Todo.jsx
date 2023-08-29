import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  faBell,
  faFillDrip,
  faTag,
  faThumbTack,
  faTrashAlt,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Todo = ({ id, title, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges: () => false });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${
        isDragging && "z-[100]"
      } break-inside-avoid px-4 pt-2 pb-12 mb-3 w-[240px] bg-white border border-slate-200 transition-shadow rounded-xl hover:shadow-lg cursor-default active:cursor-move relative`}
    >
      <h4 className="text-lg font-semibold text-slate-700 mb-2">{title}</h4>
      <p className="min-h-[115px] max-h-[355px] line-clamp-[15] text-ellipsis overflow-hidden">
        {content}
      </p>
      <div className="opacity-0 hover:opacity-100 transition-all absolute w-full h-full top-0 left-0">
        <div className="pt-4 flex justify-center items-center absolute bottom-0 left-10">
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon
              icon={faFillDrip}
              className="w-5 h-5 text-slate-500"
            />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
            <FontAwesomeIcon
              icon={faTrashCan}
              className="w-5 h-5 text-slate-500"
            />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full">
          <FontAwesomeIcon
            icon={faThumbTack}
            className="w-5 h-5 text-slate-500"
          />
        </div>
      </div>
    </li>
  );
};
