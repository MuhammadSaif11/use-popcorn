import { useEffect, useRef } from "react";
import { useKey } from "../custom-hooks/useKey";

export const Search = ({ setQuery, query }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useKey("keydown", (e) => {
    if (document.activeElement === inputEl.current) return;
    if (e.code === "Enter") {
      setQuery("");
      inputEl.current.focus();
    }
  });

  // useEffect(() => {

  //   const callback = (e) => {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.code === "Enter") {
  //       setQuery("");
  //       inputEl.current.focus();
  //     }
  //   };
  //   document.addEventListener("keydown", callback);

  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};
