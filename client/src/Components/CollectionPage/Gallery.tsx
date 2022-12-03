import React from "react";
import StackThumbnail from "./StackThumbnail";
import StyledGallery from "./styles/StyledGallery";

const Gallery = () => {
  return (
    <StyledGallery>
      <div className="gallery-container">
        <StackThumbnail />
        <StackThumbnail />
        <StackThumbnail />
        <StackThumbnail />
        <StackThumbnail />
        <StackThumbnail />
      </div>
    </StyledGallery>
  );
};

export default Gallery;
