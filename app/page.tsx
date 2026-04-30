"use client";

import { useState, useMemo } from "react";
import { Images } from "lucide-react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ImageGrid from "./components/ImageGrid";
import imagesData from "../data/images.json";
import { ImageItem } from "./types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const images: ImageItem[] = imagesData;

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

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  图片画廊
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  探索 ChatGPT Image-2 生成的精美图片和提示词
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Images className="h-4 w-4" />
                <span>共 {filteredImages.length} 张图片</span>
              </div>
            </div>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <CategoryFilter
              images={images}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>

          <ImageGrid images={filteredImages} />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Image Prompt Gallery - ChatGPT Image-2 作品展示
          </p>
        </div>
      </footer>
    </div>
  );
}
