// src/app/data/images.ts

export interface ImageData {
  image_path: string;
  tags: string[];
  ratings: string[];
  character_tags: string[];
}

export const images: ImageData[] = [
  {
    image_path: "/images/amber.png",
    tags: ["futa", "glasses"],
    ratings: ["explicit"],
    character_tags: ["furina"],
  },
  {
    image_path: "/images/miku.png",
    tags: ["futa", "glasses"],
    ratings: ["explicit"],
    character_tags: ["furina"],
  },
  {
    image_path: "/images/dragon.png",
    tags: ["futa", "glasses"],
    ratings: ["explicit"],
    character_tags: ["furina"],
  },
  // Agrega más ejemplos o conecta con el CSV real después
];
