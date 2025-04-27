// src/components/ImageCard.tsx

import React from "react";

const ImageCard = () => {
  return (
    <div className={`${styles.card}`}>
      <img src="https://via.placeholder.com/150" alt="Imagen placeholder" />
      <div>Descripción de la imagen</div>
    </div>
  );
};

const styles = {
  card: {
    width: "150px",
    margin: "10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    textAlign: "center",
  }
};

export default ImageCard;
