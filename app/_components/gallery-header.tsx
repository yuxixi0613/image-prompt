import { Sparkles } from "lucide-react";

export default function GalleryHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="size-6 text-primary" />
          <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Image Prompt Gallery
          </h1>
        </div>
        <p className="ml-4 hidden text-sm text-muted-foreground sm:block">
          ChatGPT Image-2 生成作品展示
        </p>
      </div>
    </header>
  );
}
