"use client";

import React from "react";
import { ImageData } from "../data/images";

interface ImageGridProps {
  images: ImageData[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.map((img, idx) => (
        <div key={idx} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <img
            src={img.image_path}
            alt="Imagen"
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
          <div style={{ marginTop: "5px" }}>
            <small>Tags: {img.tags.join(", ")}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
