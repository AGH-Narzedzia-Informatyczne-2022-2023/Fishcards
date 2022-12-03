import React from "react";
import StyledStackThumbnail from "./styles/StyledStackThumbnail";
import { Icon } from "@iconify/react";

const StackThumbnail = () => {
  return (
    <StyledStackThumbnail>
      <h3 className="sample-text">Elo</h3>
      <Icon className="hidden-plus" icon="material-symbols:add" />
    </StyledStackThumbnail>
  );
};

export default StackThumbnail;
