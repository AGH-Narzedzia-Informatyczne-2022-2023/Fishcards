import React, { useRef, useState } from "react";
import StyledSwitchButton from "./Styles/StyledSwitchButton";

type Props = {
  defaultChecked?: boolean;
  inputId: string;
  firstOption: string;
  secondOption: string;
};

const SwitchButton = ({
  defaultChecked,
  inputId,
  firstOption,
  secondOption,
}: Props) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  // currently isChecked is use for testing purposes only
  // wether the switchbox is switched or not will be decided by parent component
  const btnRef = useRef<HTMLInputElement>(null);
  console.log(isChecked);
  if (btnRef?.current?.value) console.log(btnRef.current.checked + "eee");
  return (
    <StyledSwitchButton>
      <h3 className={`option-display colored-${isChecked}`}>{firstOption}</h3>
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
      <h3 className={`option-display colored-${!isChecked}`}>{secondOption}</h3>
    </StyledSwitchButton>
  );
};

export default SwitchButton;
