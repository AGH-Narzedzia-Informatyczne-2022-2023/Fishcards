import styled from "styled-components";

const StyledModal = styled.div`
  --height-perc: 50;
  --width-perc: 35;
  --screen-center: calc((50 - var(--height-perc) / 2) * 1%)
    calc((50 - var(--width-perc) / 2) * 1%);

  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: calc(1% * var(--width-perc));
  height: calc(1% * var(--height-perc));

  border: 0.25rem solid ${(props) => props.theme.palette.primary.main};
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.palette.primary.light};
  inset: var(--screen-center);
`;

export default StyledModal;
