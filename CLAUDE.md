# CLAUDE.md

## Tech Stack (strict)
- Next.js 14 App Router, TypeScript (strict)
- Tailwind CSS (no CSS modules, no styled-components)
- Icons: lucide-react (nothing else)
- Forms: react-hook-form + zod (+ @hookform/resolvers)
- Animations: framer-motion (no AOS, no Swiper)
- Notifications: sonner (toast)
- i18n: React Context + JSON dictionaries (uk/ru) — see `src/i18n/`
- Images: next/image with Unsplash CDN URLs, alt text mandatory
- Config file is `next.config.mjs`, NOT `next.config.ts` (TS config needs Next 15+)

## Design Rules
- Mobile-first responsive design. Breakpoints: sm (640px), md (768px), lg (1024px).
- Use Tailwind color tokens: primary (emerald), accent (amber), surface, background, text, border.
- Never use heavy UI libraries (Material UI, Ant Design, Chakra, shadcn). Only custom components styled with Tailwind.
- All interactive elements must have focus-visible outlines.
- Respect prefers-reduced-motion: `useReducedMotion()` in framer-motion components; global CSS fallback in `globals.css`.

## Components Architecture
- Folder structure: `components/layout/`, `components/sections/`, `components/ui/`, `components/shared/`.
- Every section is a separate file in `sections/`.
- Layout (Header, Footer, MobileMenu, LanguageSwitcher, FloatingContacts) is shared via `app/[locale]/layout.tsx`.
- Calculator logic must be typed (see `lib/types.ts`). Pricing formula: `total = area * typeRate + sum(addons)`.
- LeadForm must keep honeypot, zod validation, server action with loading/success/error states, and toast notification.

## Localization
- Default locale: uk (Ukrainian). Toggle to ru (Russian) via header/footer switches.
- All visible strings come from `uk.json` / `ru.json`. Use the `useTranslation()` hook: `t(path)` for strings, `tList<T>(path)` for arrays.
- Both dictionaries must always have identical key sets. Add a key to one → add it to the other.
- Locale-less URLs are redirected to `/uk` by `src/middleware.ts`.

## Performance & Accessibility
- LCP < 2.5s, CLS < 0.1, INP < 200ms.
- `next/image` with `priority` on the Hero image, lazy loading below the fold.
- All images need explicit width/height or `fill` + aspect-ratio to prevent layout shift.
- Semantic HTML (header, main, section, footer).
- Keyboard navigation: Before/After slider works with arrow keys/Home/End, mobile menu traps focus and closes on Escape, FAQ accordion toggles with Enter/Space (native button).
- ARIA: `role="slider"` with `aria-valuetext`, `aria-live="polite"` for the calculator total, `aria-expanded` for FAQ and menus.

## Env vars
- `NEXT_PUBLIC_WEBHOOK_URL` — lead destination (used by `app/actions/lead.ts`).
- `NEXT_PUBLIC_GA_ID` — analytics ID, not wired up yet.
