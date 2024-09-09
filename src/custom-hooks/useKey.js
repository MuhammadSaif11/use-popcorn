import { useEffect } from "react";

export const useKey = (event, cb) => {
  useEffect(() => {
    document.addEventListener(event, cb);

    return () => {
      document.removeEventListener(event, cb);
    };
  }, [cb, event]);
};
