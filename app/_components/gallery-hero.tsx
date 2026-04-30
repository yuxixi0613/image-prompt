"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, Palette } from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="size-4" />
            <span>AI 生成艺术作品集</span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Image Prompt
            <span className="block text-primary">Gallery</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            探索 ChatGPT Image-2 模型生成的精美图片，发现提示词的无限可能
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Wand2 className="size-4 text-primary" />
              </div>
              <span>智能生成</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Palette className="size-4 text-primary" />
              </div>
              <span>多样风格</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="size-4 text-primary" />
              </div>
              <span>精美画质</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
