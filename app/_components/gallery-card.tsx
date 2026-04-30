"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Calendar, Tag, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ImageItem } from "../_types/gallery";

interface GalleryCardProps {
  image: ImageItem;
  priority?: boolean;
}

export default function GalleryCard({ image, priority }: GalleryCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(image.prompt);
      toast.success("提示词已复制到剪贴板");
    } catch {
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
        toast.success("提示词已复制到剪贴板");
      } else {
        toast.error("复制失败，请手动复制");
      }
    }
  };

  const shouldTruncate = image.prompt.length > 120;

  return (
    <Dialog>
      <Card className="group overflow-hidden border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <DialogTrigger
          nativeButton={false}
          render={
            <div className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-muted" />
          }
        >
          {!imgError ? (
            <Image
              src={image.imageUrl}
              alt={image.prompt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-2 text-muted-foreground">
              <Tag className="size-8" />
              <span className="text-sm">图片加载失败</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <Eye className="size-8 text-white drop-shadow-lg" />
          </div>
        </DialogTrigger>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/15"
            >
              {image.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {image.createdAt}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="relative">
            <p
              className={`text-sm leading-relaxed text-card-foreground transition-all duration-300 ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {image.prompt}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 flex items-center gap-0.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="size-3" />
                    收起
                  </>
                ) : (
                  <>
                    <ChevronDown className="size-3" />
                    展开
                  </>
                )}
              </button>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-0">
          <div className="flex flex-wrap gap-1.5">
            {image.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5"
            onClick={handleCopy}
          >
            <Copy className="size-4" />
            复制提示词
          </Button>
        </CardFooter>
      </Card>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading">图片预览</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {image.category} · {image.createdAt}
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          {!imgError ? (
            <Image
              src={image.imageUrl}
              alt={image.prompt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-2 text-muted-foreground">
              <Tag className="size-8" />
              <span>图片加载失败</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm leading-relaxed text-foreground flex-1">
              {image.prompt}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={handleCopy}
            >
              <Copy className="size-4" />
              复制
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {image.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
