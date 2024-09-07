import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

export const ListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <ToggleButton isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {isOpen1 && children}
    </div>
  );
};
