import { useEffect, useState } from "react";

export const useLocalStorageState = (intitalState, key) => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : intitalState;
  });

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(value));
  },[value,key]);

  return [value,setValue]
};
