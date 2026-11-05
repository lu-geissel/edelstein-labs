# Edelstein Labs

Eigenständige „Labs"-Subsite von [Edelstein Strategie](https://edelsteinstrategie.de) — eine Galerie für selbstgebaute AI-Skills zum Herunterladen. Look „Signal": dunkles Instrumentenpult im neuen Edelstein-Branding (Ink, Paper, Orange; Playfair Display, Inter, JetBrains Mono), Punktraster mit wanderndem Slash im Hero.

**Live:** https://labs.edelsteinstrategie.de

## Stack
- [Astro 5](https://astro.build) (static output)
- Plain CSS (`src/styles/`); das Tailwind-Plugin ist noch eingebunden, wird aber nicht mehr genutzt
- Self-hosted fonts via `@fontsource` (Inter, Playfair Display, JetBrains Mono)
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
- `src/components/` — LabsHeader/Footer, SkillCard (Modul-Kachel), SkillPreview (Vorschau je `preview.kind`), ClaudeBadge; `HeroDeck` ist seit dem Rebrand ungenutzt
- `src/styles/` — `app.css` (Tokens, Basis), `labs.css` (Komponenten)
- `src/utils/animations.ts` — Punktraster im Hero, Kopierknöpfe, Reduced Motion
- `public/brand/edelstein-wordmark.svg` — Kopie der Wortmarke aus `edelstein-website`
- Gestaltungsvorlage: `website-materials/prototypes/labs-rebrand/` (Variante C)
- `public/skills/*.skill` — Download-Pakete
