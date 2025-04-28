// Este archivo genera un array de todos los tags únicos del dataset de imágenes
// con la cantidad de veces que aparece cada uno y el tipo de tag que es.

import { ImageData } from "./fetchData";// Asegúrate que el path sea correcto

export interface TagInfo {
  name: string;
  count: number;
  type: "tag" | "character" | "rating";
}

// Función que recibe todas las imágenes y construye el índice de tags
export function buildTagsIndex(images: ImageData[]): TagInfo[] {
  const tagMap: Map<string, TagInfo> = new Map();

  images.forEach((img) => {
    // Procesamos tags normales
    img.tags.forEach((tag) => {
      const existing = tagMap.get(tag);
      if (existing) {
        existing.count++;
      } else {
        tagMap.set(tag, { name: tag, count: 1, type: "tag" });
      }
    });

    // Procesamos character_tags
    img.character_tags.forEach((char) => {
      const existing = tagMap.get(char);
      if (existing) {
        existing.count++;
      } else {
        tagMap.set(char, { name: char, count: 1, type: "character" });
      }
    });

    // Procesamos ratings
    img.ratings.forEach((rating) => {
      const existing = tagMap.get(rating);
      if (existing) {
        existing.count++;
      } else {
        tagMap.set(rating, { name: rating, count: 1, type: "rating" });
      }
    });
  });

  // Convertimos el Map a un array ordenado alfabéticamente
  return Array.from(tagMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
