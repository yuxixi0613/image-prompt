"use client";

import { ImageItem } from "../types";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  images: ImageItem[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">没有找到匹配的图片</p>
        <p className="mt-1 text-sm">尝试调整搜索关键词或筛选条件</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
