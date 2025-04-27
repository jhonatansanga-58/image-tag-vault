"use client"; // Indica que este archivo es de cliente y permite el uso de hooks y efectos de React
import { useEffect, useState } from "react";
import { fetchData } from "./utils/fetchData"; // Importamos la función para obtener datos desde el CSV

// Definimos la estructura de los datos que vamos a recibir del CSV
interface ImageData {
  image: string;
  tags: string[];
  character_tags: string[];
  ratings: string[];
}

// El componente principal de la página
export default function HomePage() {
  const [images, setImages] = useState<ImageData[]>([]); // Estado para almacenar las imágenes
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Efecto para cargar las imágenes cuando el componente se monta
  useEffect(() => {
    fetchData() // Llamamos a la función para cargar los datos desde el CSV
      .then(setImages) // Si la carga es exitosa, actualizamos el estado de las imágenes
      .catch((err) => {
        // Si hay error, mostramos un mensaje de error
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      });
  }, []); // El array vacío asegura que solo se ejecute una vez al cargar el componente

  return (
    <div>
      {/* Si hay un error, lo mostramos en pantalla */}
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        // Si no hay error, mostramos la galería de imágenes
        <div className="gallery">
          {/* Iteramos sobre el estado `images` y mostramos cada imagen */}
          {images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.image} // La clave es el nombre de la imagen para React
              src={`images/${img.image}`} // El path de la imagen
              alt="tagged" // Texto alternativo para accesibilidad
              className="image-card" // Usamos las clases definidas en CSS para estilo
            />
          ))}
        </div>
      )}
    </div>
  );
}
