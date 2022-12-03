import styled from "styled-components";

const StyledGallery = styled.div`
  --grid-gap: 2.5rem;

  width: 100%;
  padding: 1.25% 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 820px) {
    --grid-gap: 0.75rem;
    padding: 1.25% 2.5%;
  }

  .gallery-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    row-gap: var(--grid-gap);
    column-gap: var(--grid-gap);
    width: 90%;
    @media (max-width: 820px) {
      grid-template-columns: repeat(2, 1fr);
      width: 95%;
    }
  }
`;

export default StyledGallery;
