"use client";

import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Image Prompt Gallery
          </h1>
        </div>
        <p className="ml-4 hidden text-sm text-gray-500 sm:block">
          ChatGPT Image-2 生成作品展示
        </p>
      </div>
    </header>
  );
}
