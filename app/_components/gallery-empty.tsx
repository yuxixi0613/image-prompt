import { ImageOff } from "lucide-react";

export default function GalleryEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <div className="mb-4 rounded-full bg-muted p-4">
        <ImageOff className="size-8" />
      </div>
      <p className="text-lg font-medium text-foreground">没有找到匹配的图片</p>
      <p className="mt-1 text-sm">尝试调整搜索关键词或筛选条件</p>
    </div>
  );
}
