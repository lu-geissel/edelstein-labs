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

## Der Look-Block (an JEDEN Prompt anhängen)

Die Kachel legt selbst einen Purple-Radial-Tint von oben links und einen Verlauf
ins Seiten-Schwarz nach unten über das Video. Ein heller oder blauer Clip
kollidiert damit. Dieser Block hält die Farbgebung auf der Seite:

```
Color and light — follow exactly:
- Background: near-black deep green (#0A120E), getting darker toward the bottom of the frame.
- One light source only: a violet-purple glow (#5B2C6F to #9B59B6) from the upper left.
- Highlights and fine details: warm off-white (#F2F0E9).
- Never use: blue, cyan, copper, orange, or any white or light-grey background.
- Nothing readable and no marks: no text, no letters, no numbers, no logos, no brand symbols on any surface.
- Keep the lower third calm and dark. Subject centred in the upper two thirds.
- One continuous shot, slow steady motion, no cuts. 8 seconds, 16:9, 720p.
```

## Das Motiv (ein Satz, ein Gegenstand)

Der Rest des Prompts ist **ein Satz**: ein einziger Gegenstand, an dem man sieht,
was der Skill tut. Zwei Zustände genügen — vorher und nachher. Je konkreter der
Gegenstand, desto klarer liest die Kachel.

## Prompts für Google Flow (Veo)

Motiv-Satz plus Look-Block. Fertige Kacheln sind markiert.

### tile-voiceprint ✅

```
A hand writes with a pen in a notebook on a wooden desk; the written lines lift off the page as thin glowing threads and weave themselves into one steady, even ribbon of light.
```

### tile-linkedin-content-creation ✅

```
A scattered cloud of small fragments — shards, sparks, loose pieces — spirals inward above a dark surface and compresses into one single solid, clean-edged block.
```

### tile-jour-fixe ✅

```
Seven glowing markers sit scattered across a dark grid; they slide into one straight row, and one marker at the end stays dark while the others light up.
```

### tile-fable-prompter — neu zu generieren

```
A loose tangled ball of glowing threads floats above a dark surface, gets drawn into a narrow glass channel, and leaves the other side as one straight beam of light that shoots off fast.
```

### tile-session-handoff — offen

```
A glowing object in a dark room slowly dissolves into nothing, and as it fades its exact shape burns itself into a solid stone slab below, which stays lit after the object is gone.
```

## Verarbeitung

Rohes MP4 aus Flow herunterladen, dann:

```bash
./scripts/make-tile.sh voiceprint ~/Downloads/flow-clip.mp4
```

Das Script trimmt auf 8 s, skaliert auf 1280 × 720, wirft die Tonspur weg und schreibt
`mp4`, `webm` und ein Poster-`jpg` direkt nach `public/labs/video/`. Danach `npm run dev`
— die Kachel ersetzt ihr Fallback-Panel von selbst, ohne Code-Änderung.

Slugs: `voiceprint` ✅ · `linkedin-content-creation` · `jour-fixe` · `session-handoff` · `fable-prompter`

Rohclips gehören **nicht** nach `public/` — was dort liegt, wird mitdeployt. Leg sie außerhalb ab (z.B. `assets/tile-sources/`) und gib dem Script den Pfad dorthin.
