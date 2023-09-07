import { useEffect, useState } from "react";

export const useDebounce = (value = "", delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const run = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(run);
  }, [value]);

  return debounceValue;
};
