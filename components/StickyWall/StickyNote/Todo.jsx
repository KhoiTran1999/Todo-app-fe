import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Tooltip } from 'react-tooltip';
import { usePathname } from 'next/navigation';
import { DateTimePicker } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment';

import {
  EditTodoModalSelector,
  LimitSelector,
  TodoFormSelector,
  TodoListSelector,
  TokenSelector,
  ViewModeSelector,
} from '@/app/GlobalRedux/selector';
import { useClickOutsideTodo } from '@/hooks/useClickOutsideTodo';
import {
  deletePermanentTodoAxios,
  deleteTodoAxios,
  getArchiveTodoAxios,
  getTodoAxios,
  restoreTodoAxios,
  updateTodoAxios,
} from '@/service/axiosService/todoAxios';
import {
  faArchive,
  faBell,
  faClock,
  faDropletSlash,
  faPalette,
  faTag,
  faThumbTack,
  faTrashCan,
  faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { AddTodoLabel } from './AddTodoLabel/AddTodoLabel';
import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { colorList } from '@/constant/colorList';
import { toggleEditTodoModal } from '@/app/GlobalRedux/Features/toggle/editTodoModalSlider';
import { getTodoForm } from '@/app/GlobalRedux/Features/data/todoFormSlider';

export const Todo = ({
  id,
  title,
  content,
  color,
  pin,
  reminder,
  archive,
  updatedAt,
  deletedAt,
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const viewMode = useSelector(ViewModeSelector);
  const todoList = useSelector(TodoListSelector);
  const token = useSelector(TokenSelector);
  const limit = useSelector(LimitSelector);
  const todoForm = useSelector(TodoFormSelector);
  const toggleTodoModal = useSelector(EditTodoModalSelector);

  const [colorToggle, setColorToggle] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);
  const [timePickerToggle, setTimePickerToggle] = useState(false);
  const [timeValue, setTimeValue] = useState(reminder);

  const colorRef = useRef('');
  const labelRef = useRef('');
  const datePickerRef = useRef('');

  useClickOutsideTodo(colorRef, setColorToggle);
  useClickOutsideTodo(labelRef, setLabelToggle);
  useClickOutsideTodo(datePickerRef, setTimePickerToggle);

  useEffect(() => {
    setTimeValue(reminder);
  }, [reminder]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    animateLayoutChanges: () => false,
    disabled: pathname === '/todo/trash',
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleDeleteTodo = async (e) => {
    e.stopPropagation();
    await deleteTodoAxios(token.accessToken, id);

    const newTodoList = todoList.filter((val) => val.id !== id);
    dispatch(getTodoList(newTodoList));
  };

  const handleColorToggle = (e) => {
    e.stopPropagation();
    setColorToggle((prev) => !prev);
  };

  const handleChangeColor = async (e, elementColor) => {
    e.stopPropagation();
    await updateTodoAxios(token.accessToken, id, {
      title,
      content,
      color: elementColor,
      pin,
      reminder,
    });

    const newTodoList = todoList.map((val) => {
      if (val.id === id) {
        const newTodo = { ...val, color: elementColor };
        return newTodo;
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
  };

  const handlePin = async (e, isPin) => {
    e.stopPropagation();
    await updateTodoAxios(token.accessToken, id, { pin: isPin });
    const newTodoList = todoList.map((val) => {
      if (val.id === id) {
        const newTodo = { ...val, pin: isPin };
        return newTodo;
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
  };

  const handleToggleTodoLabel = (e) => {
    e.stopPropagation();
    setLabelToggle((prev) => !prev);
  };

  const handleClickTodo = () => {
    dispatch(toggleEditTodoModal(true));
    dispatch(
      getTodoForm({
        id,
        title,
        content,
        color,
        pin,
        reminder,
        archive,
        updatedAt,
        deletedAt,
      }),
    );
  };

  const handleArchive = async (e) => {
    e.stopPropagation();

    if (archive) {
      await updateTodoAxios(token.accessToken, id, { archive: false });
      const newTodoList = await getArchiveTodoAxios(token.accessToken);
      dispatch(getTodoList(newTodoList.data));
      return;
    }

    await updateTodoAxios(token.accessToken, id, { archive: true });
    const newTodoList = await getTodoAxios(token.accessToken, limit);
    dispatch(getTodoList(newTodoList.data));
  };

  const handleRestoreTodo = async (e) => {
    e.stopPropagation();

    const res = await restoreTodoAxios(token.accessToken, id);
    dispatch(getTodoList(res.data));
  };

  const HandleDeleteTodoPermanently = async (e) => {
    e.stopPropagation();

    await deletePermanentTodoAxios(token.accessToken, id);

    const newTodoList = todoList.filter((val) => val.id !== id);
    dispatch(getTodoList(newTodoList));
  };

  const handleChangeDatePicker = async (value) => {
    setTimeValue(value);

    await updateTodoAxios(token.accessToken, id, { reminder: value });
    const newTodoList = todoList.map((val) => {
      if (val.id === id) {
        return { ...val, reminder: value };
      }
      return val;
    });
    dispatch(getTodoList(newTodoList));
  };

  return (
    <li
      onClick={handleClickTodo}
      ref={setNodeRef}
      style={{ ...style, backgroundColor: color, width: '100%' }}
      {...attributes}
      {...listeners}
      className={`${
        isDragging && 'z-[100]'
      } break-inside-avoid px-4 pt-2 pb-12 ${
        viewMode ? 'w-[240px]' : 'w-full max-w-[600px]'
      } ${
        toggleTodoModal && todoForm.id === id
          ? 'opacity-0 invisible'
          : 'opacity-100 visible'
      } bg-white  border border-slate-200 transition-shadow rounded-xl xl:hover:shadow-xl cursor-default ${
        pathname !== '/todo/trash' && 'active:cursor-move'
      } relative`}
    >
      <h4 className="max-h-[100px] break-words line-clamp-[3] text-ellipsis overflow-hidden text-xl font-semibold text-slate-700 mb-2">
        {title}
      </h4>
      <p className="max-h-[360px] break-words line-clamp-[15] text-ellipsis overflow-hidden">
        {content}
      </p>
      {timeValue && (
        <div className="px-2 mt-4 bg-slate-100 w-fit rounded-full">
          <FontAwesomeIcon
            icon={faClock}
            className={`w-3 h-3 text-slate-500 ${
              new Date(timeValue).getTime() - new Date().getTime() < 0
                ? 'text-red-500'
                : ''
            }`}
          />
          <span
            className={`text-xs ml-2 ${
              new Date(timeValue).getTime() - new Date().getTime() < 0
                ? 'text-red-500'
                : ''
            }`}
          >
            {moment(timeValue).calendar()}
          </span>
        </div>
      )}
      <div
        className={`opacity-0 invisible xl:visible xl:opacity-0 xl:hover:visible xl:hover:opacity-100 ${
          colorToggle && 'opacity-100'
        } transition-all absolute w-full h-full top-0 left-0`}
      >
        <div className="pt-4 flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2 z-[100]">
          {pathname === '/todo/trash' ? (
            <>
              <div
                onClick={handleRestoreTodo}
                id={`restoreTrash` + id}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faTrashCanArrowUp}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                anchorSelect={`#restoreTrash` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Khôi phục
              </Tooltip>

              <div
                onClick={HandleDeleteTodoPermanently}
                id={`deletedPermanence` + id}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                anchorSelect={`#deletedPermanence` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Xóa vĩnh viễn
              </Tooltip>
            </>
          ) : (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setTimePickerToggle((prev) => !prev);
                }}
                id={`reminder` + id}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                anchorSelect={`#reminder` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Nhắc tôi
              </Tooltip>

              <div
                id={`selectedBackground` + id}
                data-tooltip-id={`selectedBackground` + id}
                ref={colorRef}
                onClick={handleColorToggle}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faPalette}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                isOpen={colorToggle}
                opacity={1}
                clickable
                id={`selectedBackground` + id}
                style={{ backgroundColor: 'transparent', transition: 'none' }}
              >
                <div className="bg-white p-2 shadow-[0_1px_5px_1px_rgba(0,0,0,0.3)] rounded-xl z-[1000]">
                  <div className="flex justify-center items-center flex-wrap max-[321px]:justify-start max-[321px]:w-60">
                    <div
                      onClick={(e) => handleChangeColor(e, 'white')}
                      className="py-[2px] px-[6px] mr-1 mb-1 border-2 hover:border-black border-slate-200 rounded-full cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faDropletSlash}
                        className="w-4 h-4 text-slate-500"
                      />
                    </div>
                    {colorList.map((val, idx) => (
                      <div
                        onClick={(e) => handleChangeColor(e, val)}
                        key={idx}
                        className={`p-[12px] mr-1 mb-1 rounded-full border-2 border-transparent hover:border-black cursor-pointer`}
                        style={{ backgroundColor: val }}
                      ></div>
                    ))}
                  </div>
                </div>
              </Tooltip>

              <Tooltip
                anchorSelect={`#selectedBackground` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Lựa chọn nền
              </Tooltip>

              <div
                id={`selectedLabel` + id}
                data-tooltip-id={`selectedLabel` + id}
                className="flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon
                  onClick={handleToggleTodoLabel}
                  icon={faTag}
                  className="w-5 h-5 text-slate-500 p-2 hover:bg-slate-200 rounded-full"
                />
              </div>
              <Tooltip
                anchorSelect={`#selectedLabel` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Thêm nhãn
              </Tooltip>

              <div
                id={`addArchive` + id}
                onClick={handleArchive}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faArchive}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                anchorSelect={`#addArchive` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                {archive ? 'Hủy lưu trữ' : 'Lưu trữ'}
              </Tooltip>

              <div
                id={`deletedTodo` + id}
                onClick={handleDeleteTodo}
                className="flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="w-5 h-5 text-slate-500"
                />
              </div>
              <Tooltip
                anchorSelect={`#deletedTodo` + id}
                place="bottom"
                opacity={0.9}
                style={{ transition: 'none' }}
              >
                Xóa ghi chú
              </Tooltip>
            </>
          )}
        </div>
        {pathname !== '/todo/trash' && (
          <>
            <div
              id={'pin' + id}
              className="absolute -top-1 -right-1 flex items-center justify-center cursor-pointer p-2 hover:bg-slate-200 rounded-full"
            >
              {pin ? (
                <FontAwesomeIcon
                  onClick={(e) => handlePin(e, false)}
                  icon={faThumbTack}
                  className="w-5 h-5 text-slate-500"
                />
              ) : (
                <Image
                  onClick={(e) => handlePin(e, true)}
                  className=" text-slate-500"
                  width={21}
                  height={21}
                  src="/static/img/unpin.ico"
                  alt=""
                />
              )}
            </div>
            <Tooltip
              anchorSelect={`#pin` + id}
              place="top"
              opacity={0.9}
              style={{ transition: 'none', zIndex: 1000 }}
            >
              {pin ? 'Bỏ ghim ghi chú' : 'Ghim ghi chú'}
            </Tooltip>
          </>
        )}
      </div>
      <Tooltip
        isOpen={labelToggle}
        opacity={1}
        clickable
        id={`selectedLabel` + id}
        style={{
          backgroundColor: 'transparent',
          transition: 'none',
          zIndex: '1000',
        }}
        place="top-start"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-[1000]"
          ref={labelRef}
        >
          <AddTodoLabel todoId={id} />
        </div>
      </Tooltip>
      {timePickerToggle && (
        <div
          ref={datePickerRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute -bottom-8 z-[1000]"
        >
          <div className=" bg-white">
            <DateTimePicker
              onChange={handleChangeDatePicker}
              value={timeValue}
              disableClock
              minDate={new Date()}
            />
          </div>
        </div>
      )}
    </li>
  );
};
