<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hi-me

Single-package Next.js app (create-next-app bootstrap, App Router); the README is the stock boilerplate, not repo documentation.

## Commands (npm only)

- `npm install` — the only lockfile is `package-lock.json`; do not introduce yarn/pnpm.
- `npm run dev` / `npm run build` — Turbopack is default for both in this Next 16 version.
- `npm run lint` — `biome check` (lint + format + import-order check). Auto-fix: `npx biome check --write`.
- Verify feature work with `npm run lint` **and** `npm run build` — build does not run linting, and `next lint` no longer exists.
- No test runner is configured.

## Stack quirks

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`): do not add `useMemo`/`useCallback`/`React.memo` unless profiling demands it — the compiler auto-memoizes.
- Biome, not ESLint/Prettier: no eslint config exists; all lint/format settings go in `biome.json`.
- shadcn with the `base-nova` style (`components.json`): components in `src/components/ui` are built on `@base-ui/react/*` primitives, not Radix UI.
- `cn` is a standalone dependency — components `import { cn } from "cn"`; `src/lib/utils.ts` only re-exports it. Do not swap for clsx + tailwind-merge.
- Tailwind v4 CSS-first: no `tailwind.config`; theme tokens are CSS variables in `src/app/globals.css` (`@theme inline`), dark mode is the `.dark` class.
- Typed route props: use global helpers `LayoutProps<'/route'>` / `PageProps<'/route'>` (no import needed, see `src/app/layout.tsx`) instead of hand-writing `children`/`params` types.
