import { ImageOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryEmptyProps {
  onClearFilters?: () => void;
}

export default function GalleryEmpty({ onClearFilters }: GalleryEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <div className="mb-4 rounded-full bg-muted p-4">
        <ImageOff className="size-8" />
      </div>
      <p className="text-lg font-medium text-foreground">没有找到匹配的图片</p>
      <p className="mt-1 text-sm">尝试调整搜索关键词或筛选条件</p>
      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-1.5"
          onClick={onClearFilters}
        >
          <RotateCcw className="size-4" />
          清除所有筛选
        </Button>
      )}
    </div>
  );
}
