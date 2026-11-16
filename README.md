# Edelstein Labs

Eigenständige „Labs"-Subsite von [Edelstein Strategie](https://edelsteinstrategie.de) — eine Galerie für selbstgebaute AI-Skills zum Herunterladen. Look „Signal": dunkles Instrumentenpult im neuen Edelstein-Branding (Ink, Paper, Orange; Playfair Display, Inter, JetBrains Mono), Punktraster mit wanderndem Slash im Hero.

**Live:** https://labs.edelsteinstrategie.de

## Stack
- [Astro 5](https://astro.build) (static output)
- Plain CSS (`src/styles/`)
- Self-hosted fonts via `@fontsource` (Inter, Playfair Display, JetBrains Mono)
- Self-hosted Background-/Tile-Videos in `public/labs/video/`

## Entwicklung
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
npm run preview
```

## Sprachen und Texte (seit 2026-11-16)
- Deutsch unter `/` und `/<slug>`, Englisch unter `/en/` und `/en/<slug>` (Astro i18n, `prefixDefaultLocale: false`).
- **Kein sichtbarer Text in Komponenten.** Alle Texte liegen in `src/i18n/*.json` (`{ de, en }`), gelesen über
  `texts('<bundle>', Astro.currentLocale)`. Leeres Englisch fällt Feld für Feld auf Deutsch zurück.
  `home` = Startseite · `skill` = Detailseite, Installation, Vorschau-Beschriftungen · `skills` = Texte je Skill (nach Slug) · `common` = Kopf, Fuß, Umschalter.
- `src/data/skills.ts` hält nur die Struktur (Slug, Name, Downloads, Trigger, Farben, Zahlen, Schritt-Status); `getSkills(locale)` führt sie mit `skills.json` zusammen.
  Neuer Skill: Struktur in `skills.ts` **und** Texte unter demselben Slug in `skills.json` anlegen.
- Seiten sind dünne Hüllen um `src/views/*` (`src/pages/` und `src/pages/en/`); interne Links laufen über `localizeHref`.
- Sprachumschalter `DE / EN` im Header setzt das Cookie `lang` (Domain `edelsteinstrategie.de`, also gemeinsam mit der Hauptseite).
  `vercel.json` leitet bei `lang=en` oder nicht-deutscher Browsersprache ohne Cookie auf `/en/…` um (temporär).
- Texteditor: Sveltia CMS unter `/admin` (Login über die OAuth-Funktion der Hauptseite). Nach neuen/umbenannten Textfeldern
  oder einem neuen Skill `node scripts/build-cms-config.mjs` ausführen — erzeugt `public/admin/config.yml`.
- `public/sitemap.xml` ist statisch und listet jeden Skill in beiden Sprachen; bei einem neuen Skill ergänzen.

## Struktur
- `src/pages/index.astro`, `src/pages/en/index.astro` → `src/views/home.astro` — Galerie (Hero, Skill-Grid, „Warum kostenlos", CTA)
- `src/pages/[slug].astro`, `src/pages/en/[slug].astro` → `src/views/skill.astro` — Skill-Detailseiten
- `src/data/skills.ts` — Skill-Struktur; Texte in `src/i18n/skills.json`
- `src/i18n/` — Texte DE/EN + Helfer (`texts`, `rich`, `fill`, `localizeHref`, `pathFor`)
- `src/components/` — LabsHeader/Footer, LanguageSwitch, SkillCard (Modul-Kachel), SkillPreview (Vorschau je `preview.kind`), ClaudeBadge
- `src/styles/` — `app.css` (Tokens, Basis), `labs.css` (Komponenten)
- `src/utils/animations.ts` — Punktraster im Hero, Kopierknöpfe, Reduced Motion
- `public/brand/edelstein-wordmark.svg` — Kopie der Wortmarke aus `edelstein-website`
- Gestaltungsvorlage: `website-materials/prototypes/labs-rebrand/` (Variante C)
- `public/skills/*.skill` — Download-Pakete
