interface ImageCardProps {
  imagePath: string;
}

export default function ImageCard({ imagePath }: ImageCardProps) {
  return (
    <img className="image-card" src={`images/${imagePath}`} alt="tagged" />
  );
}
