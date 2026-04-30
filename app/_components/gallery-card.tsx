"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Calendar, Tag, Eye } from "lucide-react";
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
}

export default function GalleryCard({ image }: GalleryCardProps) {
  const [imgError, setImgError] = useState(false);

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

  return (
    <Dialog>
      <Card className="group overflow-hidden border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <DialogTrigger
          render={
            <div className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-muted">
              {!imgError ? (
                <Image
                  src={image.imageUrl}
                  alt={image.prompt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            </div>
          }
        />

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
          <p className="line-clamp-3 text-sm leading-relaxed text-card-foreground">
            {image.prompt}
          </p>
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
          <p className="text-sm leading-relaxed text-foreground">
            {image.prompt}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {image.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="default" className="w-full gap-1.5" onClick={handleCopy}>
            <Copy className="size-4" />
            复制提示词
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
