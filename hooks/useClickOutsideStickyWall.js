import { getTodoList } from '@/app/GlobalRedux/Features/data/todoListSlider';
import { TokenSelector } from '@/app/GlobalRedux/selector';
import { addTodoAxios } from '@/service/axiosService/todoAxios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutsideStickyWall(
  ref,
  setTexterea,
  titleRef,
  contentRef,
  setColorToggle,
  color,
  setColor,
  isPin,
  setIsPin,
  setTimeValue,
  timeValue,
) {
  const dispatch = useDispatch();
  const token = useSelector(TokenSelector);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (contentRef.current?.value?.trim().length !== 0) {
          addTodoAxios(token.accessToken, {
            title: titleRef.current?.value?.trim(),
            content: contentRef.current?.value?.trim(),
            color,
            pin: isPin,
            reminder: timeValue,
          }).then((res) => {
            dispatch(getTodoList(res.data));
          });
        }

        if (contentRef.current?.value?.trim().length === 0) {
          toast('Content could not empty', {
            type: 'error',
            toastId: 'contentError',
          });
        }

        //reset after add todo
        titleRef.current.style.height = '24px';
        contentRef.current.style.height = '24px';
        titleRef.current.value = null;
        contentRef.current.value = null;
        setTexterea(false);
        setColorToggle(false);
        setColor('white');
        setIsPin(false);
        setTimeValue(null);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, color, timeValue, token]);
}
