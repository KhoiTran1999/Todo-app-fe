import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Todo = ({ id, title, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false });

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
      className="break-inside-avoid px-4 py-2 mb-3 w-[240px] bg-white border border-slate-200 rounded-xl hover:shadow-lg cursor-default"
    >
      <h4 className="text-lg font-semibold text-slate-700 mb-2">{title}</h4>
      <p className="min-h-[115px] max-h-[355px] line-clamp-[15] text-ellipsis overflow-hidden">
        {content}
      </p>
      <div>TOOL</div>
    </li>
  );
};
