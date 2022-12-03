import React from "react";
import StyledModal from "./Styles/StyledModal";
import SwitchButton from "./SwitchButton";

type Props = {
  textContent: string;
  children?: React.ReactNode | React.ReactNode[];
};

const Modal = ({ textContent, children }: Props) => {
  return (
    <StyledModal>
      {children}
      <SwitchButton
        defaultChecked={true}
        inputId="input-dupa "
        firstOption="111"
        secondOption="222"
      />
    </StyledModal>
  );
};

export default Modal;
