# Tile-Videos — Prompts & Verarbeitung

Jede Skill-Kachel auf der Startseite zeigt ein 8-Sekunden-Loop im Hintergrund.
Fehlt es, rendert `SkillCard.astro` ein typografisches Fallback-Panel — die Seite
bleibt heil, aber ein Video ist besser.

## Spec (aus den bestehenden drei Kacheln abgeleitet)

| Eigenschaft | Wert |
|---|---|
| Auflösung | 1280 × 720 |
| Länge | 8,0 s |
| Ton | keiner (Kacheln laufen stumm) |
| Formate | `tile-<slug>.mp4` · `tile-<slug>.webm` · `tile-<slug>.jpg` (Poster) |
| Zielgröße | 300–700 KB pro Datei |
| Ablage | `public/labs/video/` |

**Look:** echte Stock-Footage-Szenen mit Menschen bei der Arbeit, neutral belichtet,
ruhige Kamera. **Kein** abstraktes AI-Geglitzer, keine Neon-Ästhetik — die Karte legt
selbst einen Purple-Radial-Tint und einen Verlauf nach unten drüber. Was zu dunkel oder
zu bunt aus dem Generator kommt, kollidiert damit.

**Kein Text im Bild.** Lesbare Schrift auf Bildschirmen oder Papier wird bei
16:9 → Kachelausschnitt angeschnitten und sieht nach Fehler aus.

## Prompts für Google Flow (Veo)

Ein Prompt pro Kachel, jeweils 8 s, 16:9, 720p. Jeweils direkt kopierbar.

### tile-voiceprint

```
Overhead shot of a person's hands writing with a pen in a paper notebook on a wooden desk, an open laptop and a cup of coffee beside it, soft natural window light from the left, warm neutral colours, very slow push-in, shallow depth of field, documentary style, no text visible anywhere, 8 seconds.
```

### tile-linkedin-pipeline

```
Medium handheld shot of a craftsman in his forties standing in a bright workshop, holding his phone up close to his mouth and speaking into it to record a voice memo, dust in the daylight from a large window behind him, natural colours, slight camera drift, documentary style, no text visible, 8 seconds.
```

### tile-jour-fixe

```
Wide static shot of three colleagues in a bright modern meeting room looking at a large wall screen, one of them standing and gesturing towards it while the others take notes, daylight from floor-to-ceiling windows, neutral colours, calm realistic office documentary style, the screen content is blurred and unreadable, no legible text, 8 seconds.
```

### tile-session-handoff

```
Wide static shot of an office in the late evening, one person closes a laptop, picks up a jacket and walks out of frame, a single desk lamp stays on over the empty desk, warm low light against blue dusk through the windows, calm and quiet, cinematic documentary style, no text visible, 8 seconds.
```

### tile-fable-prompter

```
Close-up over-the-shoulder shot of hands typing on a laptop keyboard at night, screen glow on the fingers, shallow depth of field, the screen is out of focus and unreadable, warm desk lamp behind, slow drift to the right, cinematic documentary style, no legible text, 8 seconds.
```

## Verarbeitung

Rohes MP4 aus Flow herunterladen, dann:

```bash
./scripts/make-tile.sh voiceprint ~/Downloads/flow-clip.mp4
```

Das Script trimmt auf 8 s, skaliert auf 1280 × 720, wirft die Tonspur weg und schreibt
`mp4`, `webm` und ein Poster-`jpg` direkt nach `public/labs/video/`. Danach `npm run dev`
— die Kachel ersetzt ihr Fallback-Panel von selbst, ohne Code-Änderung.

Slugs: `voiceprint` · `linkedin-pipeline` · `jour-fixe` · `session-handoff` · `fable-prompter`
