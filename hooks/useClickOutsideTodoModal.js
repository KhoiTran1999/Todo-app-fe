import { getTodoForm } from '@/app/GlobalRedux/Features/data/todoFormSlider';
import { toggleEditTodoModal } from '@/app/GlobalRedux/Features/toggle/editTodoModalSlider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useClickOutsideTodoModal(ref) {
  const dispath = useDispatch();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispath(toggleEditTodoModal(false));
        dispath(getTodoForm({}));
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
