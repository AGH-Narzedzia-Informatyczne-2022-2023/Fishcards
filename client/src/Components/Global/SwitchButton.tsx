import React, { useRef, useState } from "react";
import StyledSwitchButton from "./Styles/StyledSwitchButton";

type Props = {
  defaultChecked?: boolean;
  inputId: string;
};

const SwitchButton = ({ defaultChecked, inputId }: Props) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const btnRef = useRef<HTMLInputElement>(null);
  console.log(isChecked);
  if (btnRef?.current?.value) console.log(btnRef.current.checked + "eee");
  return (
    <StyledSwitchButton>
      <label
        className={`switch-input-label checked-${isChecked}`}
        htmlFor={inputId}
      ></label>
      <input
        className="switch-input"
        id={inputId}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        ref={btnRef}
      ></input>
    </StyledSwitchButton>
  );
};

export default SwitchButton;
