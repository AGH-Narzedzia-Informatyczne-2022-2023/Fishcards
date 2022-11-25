import React from "react";
import { Icon } from "@iconify/react";
import StyledNavbar from "./Styles/StyledNavbar";
import { useTheme } from "styled-components";

const Navbar = () => {
  return (
    <StyledNavbar>
      <h3 id="logo-text">Fishcards</h3>
      <div id="nav-buttons">
        <Icon icon="game-icons:aquarium" />
        <Icon icon="ic:outline-palette" />
        <Icon icon="ic:baseline-display-settings" />
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
