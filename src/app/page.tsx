'use client';
import { useEffect, useState } from 'react';
import { fetchData } from './utils/fetchData';
import ImageCard from './components/ImageCard';

interface ImageData {
  image: string;
  tags: string[];
  character_tags: string[];
  ratings: string[];
}

export default function HomePage() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(setImages)
      .catch((err) => {
        console.error("Error fetching images:", err);
        setError("Failed to load images. Please try again later.");
      });
  }, []);

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="gallery">
          {images.map((img) => (
            <ImageCard key={img.image} imagePath={img.image} />
          ))}
        </div>
      )}
    </div>
  );
}
