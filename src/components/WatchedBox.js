import { useState } from "react";
import { ToggleButton } from "./ToggleButton";

export const WatchedBox = ({ children }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen2} setIsOpen={setIsOpen2} />
      {isOpen2 && children}
    </div>
  );
};
