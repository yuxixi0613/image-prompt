import { ImageItem } from "../_types/gallery";
import GalleryCard from "./gallery-card";
import GalleryEmpty from "./gallery-empty";

interface GalleryGridProps {
  images: ImageItem[];
  onClearFilters?: () => void;
}

export default function GalleryGrid({ images, onClearFilters }: GalleryGridProps) {
  if (images.length === 0) {
    return <GalleryEmpty onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <GalleryCard key={image.id} image={image} priority={index < 3} />
      ))}
    </div>
  );
}
