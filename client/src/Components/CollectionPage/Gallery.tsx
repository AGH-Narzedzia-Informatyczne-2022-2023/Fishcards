import React from "react";
import StackThumbnail from "./StackThumbnail";
import StyledGallery from "./styles/StyledGallery";

const Gallery = () => {
  return (
    <StyledGallery>
      <StackThumbnail />
      <StackThumbnail />
      <StackThumbnail />
      <StackThumbnail />
      <StackThumbnail />
      <StackThumbnail />
    </StyledGallery>
  );
};

export default Gallery;
