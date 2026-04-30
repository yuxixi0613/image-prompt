"use client";

import { motion } from "framer-motion";
import { ImageItem } from "../_types/gallery";
import GalleryCard from "./gallery-card";
import GalleryEmpty from "./gallery-empty";

interface GalleryGridProps {
  images: ImageItem[];
  onClearFilters?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function GalleryGrid({ images, onClearFilters }: GalleryGridProps) {
  if (images.length === 0) {
    return <GalleryEmpty onClearFilters={onClearFilters} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {images.map((image, index) => (
        <motion.div key={image.id} variants={itemVariants}>
          <GalleryCard image={image} priority={index < 3} />
        </motion.div>
      ))}
    </motion.div>
  );
}
