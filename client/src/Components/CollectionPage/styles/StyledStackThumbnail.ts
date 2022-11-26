import styled from "styled-components";

const StyledStackThumbnail = styled.div`
  aspect-ratio: 1/1;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.palette.common.white};
  border-style: dashed;
  display: flex;
  justify-content: center;
  align-items: center;

  .sample-text {
    visibility: visible;
    position: relative;
  }
  .hidden-plus {
    position: absolute;
    visibility: hidden;
    width: 10%;
    height: 10%;
    color: ${(props) => props.theme.palette.primary.main};
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.light};
    border-color: ${(props) => props.theme.palette.primary.main};
    border-width: 0.375rem;
    border-style: solid;
    .sample-text {
      visibility: hidden;
    }
    .hidden-plus {
      visibility: visible;
    }
  }
`;

export default StyledStackThumbnail;
