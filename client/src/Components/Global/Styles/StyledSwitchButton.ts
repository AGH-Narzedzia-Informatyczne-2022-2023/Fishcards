import styled from "styled-components";

const StyledSwitchButton = styled.div`
  --height: 2.25rem;
  --width: calc(2 * var(--height));
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.25rem;
  font-family: ${(props) => props.theme.typography.fontFamily};

  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &:checked {
      background-color: red;
    }
  }

  .switch-input-label {
    cursor: pointer;
    width: var(--width);
    height: var(--height);
    background: ${(props) => props.theme.palette.common.gray};
    display: block;
    border-radius: 100vmax;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(1 / 2 * var(--width));
      height: calc(var(--height));
      background: #fff;
      border-radius: 100vmax;
      transition: 0.3s;
    }
    :active::after {
      width: calc(var(--width) * 3 / 4);
    }
  }

  .checked-true {
    background: ${(props) => props.theme.palette.primary.main};
    &::after {
      left: calc(100% - var(--width) / 100);
      transform: translateX(-100%);
    }
  }

  .option-display {
    font-size: 1.25rem;
    color: ${(props) => props.theme.palette.common.gray};
    transition: color 400ms ease-in-out;

    &.colored-true {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export default StyledSwitchButton;
