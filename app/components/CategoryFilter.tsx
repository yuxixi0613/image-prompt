"use client";

import { Tag } from "lucide-react";
import { ImageItem } from "../types";

interface CategoryFilterProps {
  images: ImageItem[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function CategoryFilter({
  images,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
}: CategoryFilterProps) {
  const categories = ["全部", ...Array.from(new Set(images.map((img) => img.category)))];

  const allTags = Array.from(
    new Set(images.flatMap((img) => img.tags))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500 mr-1">
            <Tag className="h-3.5 w-3.5" />
            <span>标签:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
