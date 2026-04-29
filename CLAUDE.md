# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server
npm run build    # Production build + validation
npm run start    # Serve production build after build
npm run lint     # ESLint (Next.js core web vitals + TypeScript)
```

No test framework is configured. Validate changes with `npm run lint` and `npm run build`.

## Architecture

**Stack**: Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, `next-intl` 4.

**Routing**: All pages live under `src/app/[locale]/` — the `[locale]` dynamic segment is populated by middleware (`src/middleware.ts`) which matches `/(ar|en)/:path*` and injects the locale. Pages: home, about, contact, clients, services, process, projects (list + `[slug]` detail).

**Internationalization**:
- Locales: `en` (default) and `ar`.
- Routing config: `src/i18n/routing.ts` — exports `Link`, `redirect`, `usePathname`, `useRouter` wrappers that preserve the locale prefix.
- Server-side locale resolution: `src/i18n/request.ts` — validates locale and imports `messages/{locale}.json`.
- Translations live in `messages/en.json` and `messages/ar.json` using nested namespaces (e.g., `Home.Hero.headline`, `Navigation.about`).
- Client components call `useTranslations('Namespace')`; server components/pages call `getTranslations('Namespace')`.
- Layout sets `dir="rtl"` for Arabic and `dir="ltr"` for English, and loads locale-specific Google Fonts (Playfair Display + Inter for English; Cairo + Tajawal for Arabic) via `next/font`.

**Component Layout**:
- `src/components/layout/` — `Header`, `Footer`, `MobileContactBar` (shared across all pages via `[locale]/layout.tsx`).
- `src/components/home/` — one file per homepage section (Hero, Stats, About, Services, Projects, Process, WhyChooseUs, Testimonials, CTA). Home `page.tsx` composes all nine.
- `src/components/ui/` — small reusable pieces: `SectionHeading`, `ServiceCard`, `ProjectPhysicsCard`, `LanguageSwitcher`, `FloatingWhatsApp`.

**Styling**: Tailwind CSS v4 with no separate `tailwind.config.*` — configuration is entirely in `globals.css` via CSS custom properties (`--color-primary`, `--font-en-heading`, etc.). Use `clsx` + `tailwind-merge` for conditional classes.

**Animations**: Framer Motion for scroll-based and entrance animations. Matter.js powers the floating physics particles in `HeroPhysics.tsx`.

**Data**: All content is currently static/hardcoded (no CMS or API). Project detail data is placeholder in `projects/[slug]/page.tsx`. The contact form has no submission handler yet.

**Deployment**: Netlify via `netlify.toml` using `@netlify/plugin-nextjs`.

## Conventions

- `'use client'` only where needed (interactivity, browser APIs, hooks like `useTranslations`, Framer Motion). Pages and layout are server components.
- Import alias `@/*` maps to `src/*`.
- Commit style: `feat:`, `fix:`, `chore:` prefixes with short imperative summaries.
- When editing translations, update **both** `messages/en.json` and `messages/ar.json`.
- RTL layout: avoid hard-coded `left`/`right` CSS — prefer Tailwind's `start`/`end` logical properties, or conditionally apply directional classes based on the `locale` value.
