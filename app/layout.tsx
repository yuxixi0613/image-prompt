import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Image Prompt Gallery - ChatGPT Image-2 作品展示",
  description: "展示 ChatGPT Image-2 模型生成的精美图片及提示词",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${playfair.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "oklch(0.25 0.04 30)",
              color: "oklch(0.98 0.01 85)",
              border: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
