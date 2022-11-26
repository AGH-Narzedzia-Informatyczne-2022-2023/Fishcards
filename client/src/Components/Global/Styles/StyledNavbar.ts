import styled from "styled-components";
const StyledNavbar = styled.nav`
  display: flex;
  font-family: Inter, sans-serif;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  height: 10vh;
  background-color: #0f0f0f90;
  color: #f0f8ff;
  position: sticky;
  margin-bottom: 1.25%;
  #logo-text {
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 1.75rem;
    text-shadow: 0.0525rem 0.0625rem 0.125rem #f0f0ff;
  }
  #nav-buttons {
    display: flex;
    gap: 0.25rem;
    & {
      align-items: center;
      font-size: 3rem;
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export default StyledNavbar;
