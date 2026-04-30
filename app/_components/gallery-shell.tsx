"use client";

import { useState, useMemo } from "react";
import { Images } from "lucide-react";
import GalleryFilters from "./gallery-filters";
import GalleryGrid from "./gallery-grid";
import { ImageItem } from "../_types/gallery";

interface GalleryShellProps {
  images: ImageItem[];
}

export default function GalleryShell({ images }: GalleryShellProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch =
        searchQuery === "" ||
        image.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "全部" || image.category === selectedCategory;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => image.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [images, searchQuery, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("全部");
    setSelectedTags([]);
  };

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                图片画廊
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                探索 ChatGPT Image-2 生成的精美图片和提示词
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Images className="size-4" />
              <span>共 {filteredImages.length} 张图片</span>
            </div>
          </div>

          <GalleryFilters
            images={images}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>

        <GalleryGrid images={filteredImages} onClearFilters={handleClearFilters} />
      </div>
    </main>
  );
}
