# 使用 frontend-design + shadcn + next-best-practices 重构计划

## 项目现状分析

当前是一个 Next.js 16 + React 19 + Tailwind CSS v4 的图片展示网站，存在以下问题：

1. **设计层面**：使用 Inter 字体 + 灰白配色，属于典型的"AI 默认审美"，缺乏辨识度
2. **组件层面**：所有 UI 都是手写 div + Tailwind 类，没有使用 shadcn/ui 组件体系
3. **架构层面**：`page.tsx` 是 Client Component（`"use client"`），违反了 Next.js RSC 最佳实践
4. **结构层面**：组件平铺在 `app/components/`，没有按功能模块组织

---

## 重构目标

1. **frontend-design**：打造具有辨识度的视觉风格（编辑杂志风 + 温暖大地色系）
2. **shadcn**：引入 shadcn/ui 组件库（Button、Badge、Input、Card、Dialog 等），替换手写组件
3. **next-best-practices**：将 page.tsx 改为 Server Component，提取客户端逻辑到独立组件

---

## 阶段一：初始化 shadcn/ui

1. 运行 `npx shadcn@latest init` 初始化 shadcn（选择 Next.js 模板、Tailwind v4、pnpm）
2. 安装基础组件：`npx shadcn@latest add button badge input card dialog separator skeleton`
3. 配置 `components.json` 和 CSS 变量主题

## 阶段二：设计系统重构（frontend-design 驱动）

4. **字体替换**：Inter → Playfair Display（标题）+ Source Serif 4（正文），营造编辑杂志感
5. **配色重构**：灰白 → 温暖大地色系（奶油白背景、赭石accent、深棕文字）
6. **全局样式**：更新 `globals.css` 的 CSS 变量和 `@theme inline` 配置
7. **布局更新**：`layout.tsx` 应用新字体变量

## 阶段三：组件架构重构（next-best-practices 驱动）

8. **目录重组**：
   ```
   app/
   ├── page.tsx                    # Server Component（无 "use client"）
   ├── layout.tsx                  # 根布局
   ├── globals.css                 # 全局样式
   ├── (gallery)/                  # 路由分组（可选）
   │   └── page.tsx
   ├── _components/                # 私有组件（Next.js 约定）
   │   ├── gallery-shell.tsx       # 客户端外壳组件（含状态管理）
   │   ├── gallery-header.tsx      # 页面头部（Server Component）
   │   ├── gallery-filters.tsx     # 筛选栏（Client Component）
   │   ├── gallery-grid.tsx        # 图片网格（Server Component）
   │   ├── gallery-card.tsx        # 图片卡片（Client Component）
   │   └── gallery-empty.tsx       # 空状态（Server Component）
   ├── _types/
   │   └── gallery.ts              # 类型定义
   └── _lib/
       └── utils.ts                # cn() 工具函数（shadcn 自带）
   ```

9. **RSC 边界重构**：
   - `page.tsx` → 纯 Server Component，只负责数据获取和布局组装
   - 创建 `gallery-shell.tsx` → Client Component，封装所有 useState/useMemo 逻辑
   - `gallery-header.tsx` → Server Component（无交互逻辑）
   - `gallery-filters.tsx` → Client Component（搜索、分类、标签筛选）
   - `gallery-card.tsx` → Client Component（复制提示词需要浏览器 API）
   - `gallery-grid.tsx` → Server Component（接收过滤后的数据，纯渲染）

## 阶段四：shadcn 组件替换

10. **替换 SearchBar**：手写 input → shadcn `Input` 组件 + `Search` 图标
11. **替换 CategoryFilter**：手写 button → shadcn `Badge` + `ToggleGroup` 组件
12. **替换 ImageCard**：手写 div 卡片 → shadcn `Card` 组件（CardHeader/CardContent/CardFooter）
13. **添加 Dialog**：点击卡片打开大图预览（shadcn `Dialog` 组件）
14. **替换按钮**：手写 button → shadcn `Button` 组件（variant="outline" + size="sm"）
15. **添加 Skeleton**：图片加载时使用 shadcn `Skeleton` 占位

## 阶段五：设计细节打磨（frontend-design）

16. **卡片设计**：添加微妙的阴影层次、圆角变化、hover 时的优雅过渡
17. **排版层次**：标题用 Playfair Display 衬线体，正文用 Source Serif 4
18. **微交互**：
    - 卡片 hover：图片轻微放大 + 阴影加深
    - 复制按钮：点击后显示 Toast 提示（sonner）
    - 筛选切换：平滑过渡动画
19. **背景质感**：添加微妙的纸张纹理或渐变网格背景
20. **空状态设计**：使用插图风格的 Empty 组件

## 阶段六：数据与类型

21. 将 `data/images.json` 保留，但添加类型安全的导入
22. 类型定义迁移到 `app/_types/gallery.ts`
23. 考虑添加 `loading.tsx` 和 `error.tsx`（Next.js 约定文件）

## 阶段七：验证与构建

24. 运行 `pnpm build` 检查构建错误
25. 运行 `pnpm lint` 检查代码规范
26. 验证所有交互功能（搜索、筛选、复制、Dialog）

---

## 关键设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 字体 | Playfair Display + Source Serif 4 | 编辑杂志感，区别于千篇一律的 Inter |
| 配色 | 大地色系（奶油白、赭石、深棕） | 温暖、高级、与图片内容和谐 |
| 组件库 | shadcn/ui | 与 Tailwind 深度集成，可完全自定义样式 |
| RSC 策略 | page.tsx 纯服务端，状态下沉到 shell | 符合 Next.js 最佳实践，利于 SEO 和性能 |
| 图片预览 | shadcn Dialog | 无需新路由，轻量实现 |
| Toast 提示 | sonner | shadcn 生态标准，复制成功反馈 |

## 风险与注意事项

1. shadcn/ui 初始化会修改 `globals.css` 和创建 `components.json`，需确保与现有 Tailwind v4 配置兼容
2. 字体切换后需检查所有 `font-sans` / `font-serif` 的使用
3. RSC 重构时确保客户端组件正确标记 `"use client"`
4. shadcn 组件默认样式可能需要覆盖以匹配 frontend-design 的设计方向
