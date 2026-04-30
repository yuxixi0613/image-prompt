import GalleryHeader from "./_components/gallery-header";
import GalleryShell from "./_components/gallery-shell";
import imagesData from "../data/images.json";
import { ImageItem } from "./_types/gallery";

export default function Home() {
  const images: ImageItem[] = imagesData;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GalleryHeader />
      <GalleryShell images={images} />
      <footer className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Image Prompt Gallery — ChatGPT Image-2 作品展示
          </p>
        </div>
      </footer>
    </div>
  );
}
