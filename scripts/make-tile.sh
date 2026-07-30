#!/usr/bin/env bash
# make-tile.sh — Rohclip (z.B. aus Google Flow) zu einem Kachel-Asset-Satz verarbeiten.
#
#   ./scripts/make-tile.sh <slug> <input.mp4> [start-sekunde]
#
# Schreibt nach public/labs/video/:
#   tile-<slug>.mp4   H.264, 1280x720, 8s, ohne Ton
#   tile-<slug>.webm  VP9,   1280x720, 8s, ohne Ton
#   tile-<slug>.jpg   Poster-Frame (Sekunde 3 des Ausschnitts)
set -euo pipefail

SLUG="${1:-}"
INPUT="${2:-}"
START="${3:-0}"
DUR=8

if [[ -z "$SLUG" || -z "$INPUT" ]]; then
  echo "Usage: $0 <slug> <input.mp4> [start-sekunde]" >&2
  exit 1
fi
if [[ ! -f "$INPUT" ]]; then
  echo "Input nicht gefunden: $INPUT" >&2
  exit 1
fi
command -v ffmpeg >/dev/null || { echo "ffmpeg fehlt (brew install ffmpeg)" >&2; exit 1; }

# TILE_OUT überschreibt das Zielverzeichnis (für Probeläufe).
OUT="${TILE_OUT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/labs/video}"
mkdir -p "$OUT"

# Auf 1280x720 bringen: hochskalieren/beschneiden statt verzerren.
SCALE="scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24"

echo "→ mp4"
ffmpeg -v error -y -ss "$START" -i "$INPUT" -t "$DUR" \
  -an -vf "$SCALE" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 24 -preset slow -movflags +faststart "$OUT/tile-$SLUG.mp4"

echo "→ webm"
ffmpeg -v error -y -ss "$START" -i "$INPUT" -t "$DUR" \
  -an -vf "$SCALE" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  "$OUT/tile-$SLUG.webm"

echo "→ poster"
ffmpeg -v error -y -ss "$START" -i "$INPUT" -ss 3 -frames:v 1 \
  -vf "$SCALE" -q:v 4 "$OUT/tile-$SLUG.jpg"

echo
ls -lh "$OUT/tile-$SLUG."{mp4,webm,jpg} | awk '{print $5, $9}'
echo "fertig. npm run dev — die Kachel zieht das Video automatisch."
