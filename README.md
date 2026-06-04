# Edelstein Labs

Eigenständige „Labs"-Subsite von [Edelstein Strategie](https://edelsteinstrategie.de) — eine dunkle, moderne Galerie für selbstgebaute AI-Skills zum Herunterladen.

**Live:** https://labs.edelsteinstrategie.de

## Stack
- [Astro 5](https://astro.build) (static output)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Self-hosted fonts via `@fontsource` (Inter, Playfair Display, Cinzel, JetBrains Mono, Mrs Saint Delafield)
- Self-hosted Background-/Tile-Videos in `public/labs/video/`

## Entwicklung
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview
```

## Struktur
- `src/pages/index.astro` — Galerie (Hero, Skill-Grid, „Warum kostenlos", CTA)
- `src/pages/[slug].astro` — Skill-Detailseiten
- `src/data/skills.ts` — Skill-Daten (Single Source of Truth)
- `src/components/` — LabsHeader/Footer, SkillCard, SkillPreview, HeroDeck
- `src/styles/` — `app.css` (Tokens), `labs.css` (Glass/Glow/Motion)
- `public/skills/*.skill` — Download-Pakete
