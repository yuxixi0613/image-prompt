# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Image Prompt Gallery — a Next.js 16 showcase app for AI-generated image prompts (ChatGPT Image-2). Static data (no backend/API routes), client-side filtering, warm editorial magazine design.

## Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Production server | `pnpm start` |
| Lint | `pnpm lint` |
| Add shadcn component | `pnpm dlx shadcn@latest add <component>` |

Package manager is **pnpm**. No test suite exists.

## Architecture

### RSC Boundaries

- `app/page.tsx` (Server Component) loads static data from `data/images.json` and passes it to client components
- `app/_components/gallery-shell.tsx` (Client Component) is the central state owner — holds search, category, and tag filter state, computes `filteredImages` via `useMemo`
- Server/Client boundary is deliberately narrow: data flows down from `page.tsx` → `gallery-shell.tsx`, all interactive state lives in client components under `app/_components/`

### Key Files

- `data/images.json` — the only data source (static `ImageItem[]`)
- `app/_types/gallery.ts` — `ImageItem` interface (id, imageUrl, prompt, category, tags, createdAt)
- `app/globals.css` — full design system: oklch earth-tone palette, shadcn CSS variables, font bindings
- `components.json` — shadcn config (style: `base-nova`, RSC enabled, CSS variables)

### UI Stack

- **shadcn/ui** with `base-nova` style (uses `@base-ui/react` primitives, not Radix)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Fonts**: Playfair Display (headings) + Source Serif 4 (body), loaded in `layout.tsx`
- **Icons**: lucide-react
- **Toasts**: sonner with next-themes integration

### Component Patterns

- `app/_components/` — app-specific gallery components
- `components/ui/` — shadcn primitives (badge, button, card, dialog, input, separator, skeleton, sonner)
- `lib/utils.ts` — standard shadcn `cn()` utility (clsx + tailwind-merge)
- Path alias: `@/*` maps to project root

## Important Notes

- Next.js 16 has breaking changes from earlier versions — check `node_modules/next/dist/docs/` before writing Next.js-specific code
- Remote images are restricted to `images.unsplash.com` (configured in `next.config.ts`)
- All UI text is in Chinese (zh-CN locale), prompts are in English
- `gallery-grid.tsx` sets `priority={true}` on the first 3 cards for LCP — preserve this when modifying the grid
