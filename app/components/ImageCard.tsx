"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Calendar, Tag } from "lucide-react";
import { ImageItem } from "../types";

interface ImageCardProps {
  image: ImageItem;
}

export default function ImageCard({ image }: ImageCardProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(image.prompt);
      handleCopySuccess();
    } catch {
      // Fallback for browsers that don't support clipboard API
      if (
        typeof document.queryCommandSupported === "function" &&
        document.queryCommandSupported("copy")
      ) {
        const textArea = document.createElement("textarea");
        textArea.value = image.prompt;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        handleCopySuccess();
      }
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {!imgError ? (
          <Image
            src={image.imageUrl}
            alt={image.prompt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            <Tag className="h-8 w-8" />
            <span className="ml-2 text-sm">图片加载失败</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
            {image.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            {image.createdAt}
          </span>
        </div>

        <p className="mb-3 flex-1 text-sm leading-relaxed text-gray-700 line-clamp-3">
          {image.prompt}
        </p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {image.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-green-600">已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>复制提示词</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
