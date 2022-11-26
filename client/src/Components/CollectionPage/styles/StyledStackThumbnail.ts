import styled from "styled-components";

const StyledStackThumbnail = styled.div`
  aspect-ratio: 1/1;
  border: 0.25rem solid ${(props) => props.theme.palette.primary.main};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.palette.common.white};
  border-style: dashed;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 200ms ease-in-out;

  @media (max-width: 820px) {
    border-width: 0.125rem;
  }

  .sample-text {
    visibility: visible;
    position: relative;
  }
  .hidden-plus {
    position: absolute;
    visibility: hidden;
    width: 25%;
    height: 25%;
    color: ${(props) => props.theme.palette.primary.main};
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
    border-color: ${(props) => props.theme.palette.primary.main};
    border-width: 0.375rem;
    border-style: solid;

    transform: scale(1.02);

    .sample-text {
      visibility: hidden;
    }
    .hidden-plus {
      visibility: visible;
    }
  }
`;

export default StyledStackThumbnail;
