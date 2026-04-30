import { motion } from "framer-motion";
import { ImageOff, RotateCcw, SearchX, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryEmptyProps {
  onClearFilters?: () => void;
}

export default function GalleryEmpty({ onClearFilters }: GalleryEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 text-muted-foreground"
    >
      <div className="relative mb-6">
        <div className="rounded-full bg-muted p-6">
          <SearchX className="size-10 text-muted-foreground/60" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
          className="absolute -right-1 -top-1 rounded-full bg-background p-1.5 shadow-sm"
        >
          <ImageOff className="size-4 text-muted-foreground/40" />
        </motion.div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground">
        没有找到匹配的图片
      </h3>
      <p className="mt-2 max-w-md text-center text-sm leading-relaxed">
        尝试调整搜索关键词、更换分类或清除标签筛选，发现更多精彩内容
      </p>
      
      {onClearFilters && (
        <Button
          variant="outline"
          size="sm"
          className="mt-6 gap-1.5"
          onClick={onClearFilters}
        >
          <RotateCcw className="size-4" />
          清除所有筛选
        </Button>
      )}
      
      <div className="mt-8 flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
        <Lightbulb className="size-4 text-primary/60" />
        <span>提示：尝试搜索风景、人物、抽象等关键词</span>
      </div>
    </motion.div>
  );
}
