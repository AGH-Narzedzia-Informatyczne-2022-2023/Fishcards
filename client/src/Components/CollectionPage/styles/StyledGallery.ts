import styled from "styled-components";

const StyledGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 1rem;
  width: 80%;
  padding: 0 10%;
`;

export default StyledGallery;
