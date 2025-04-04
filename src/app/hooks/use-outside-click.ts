import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (
  initialStateIsVisible: boolean,
  onCloseCallback?: () => void
) => {
  let timeout: any;
  const [isShow, setShow] = useState(initialStateIsVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      if (isShow) {
        timeout = setTimeout(() => {
          setShow(false);
          onCloseCallback?.();
        }, 10);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isShow, setShow };
};
