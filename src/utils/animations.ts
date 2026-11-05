// Edelstein Labs — hero dot-matrix field, copy buttons, reduced-motion handling.
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dot-matrix field: dots light up along a sweeping slash (the wordmark's "/") and around the pointer.
function initField() {
  const cv = document.querySelector<HTMLCanvasElement>('.field');
  const ctx = cv?.getContext('2d');
  if (!cv || !ctx) return;
  const still = reduced();
  const gap = 14;
  let w = 0, h = 0, px = -999, py = -999;
  const t0 = performance.now();

  const size = () => {
    const r = cv.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (now: number) => {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, w, h);
    // The slash leans like the wordmark's slash and drifts slowly across the right half.
    const sx = w * (0.62 + 0.12 * Math.sin(t * 0.25));
    const slope = 0.27; // horizontal shift per vertical pixel
    for (let y = gap / 2; y < h; y += gap) {
      const lineX = sx + (h / 2 - y) * slope;
      for (let x = gap / 2; x < w; x += gap) {
        let v = Math.max(0, 1 - Math.abs(x - lineX) / 46);
        const wave = 0.5 + 0.5 * Math.sin(x * 0.02 + y * 0.015 - t * 1.4);
        v = Math.max(v, 0.08 + 0.06 * wave);
        const pd = Math.hypot(x - px, y - py);
        if (pd < 140) v = Math.max(v, (1 - pd / 140) * 0.9);
        if (v > 0.55) {
          ctx.fillStyle = `rgba(255,59,24,${v.toFixed(2)})`;
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
        } else {
          ctx.fillStyle = `rgba(242,240,235,${(v * 0.55).toFixed(3)})`;
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }
    if (!still) requestAnimationFrame(draw);
  };

  size();
  window.addEventListener('resize', () => { size(); if (still) draw(performance.now()); });
  const hero = cv.parentElement;
  hero?.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top;
  });
  hero?.addEventListener('pointerleave', () => { px = py = -999; });
  requestAnimationFrame(draw);
}

// Copy buttons: write to the clipboard, fall back to selecting the command text.
function initCopy() {
  document.querySelectorAll<HTMLElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const label = btn.querySelector('[data-copy-label]');
      const done = () => {
        if (!label) return;
        label.textContent = 'kopiert';
        setTimeout(() => (label.textContent = 'kopieren'), 1600);
      };
      const fallback = () => {
        const code = btn.querySelector('code');
        const sel = window.getSelection();
        if (!code || !sel) return;
        const r = document.createRange();
        r.selectNodeContents(code);
        sel.removeAllRanges();
        sel.addRange(r);
      };
      try {
        navigator.clipboard.writeText(btn.dataset.copy || '').then(done, fallback);
      } catch {
        fallback();
      }
    });
  });
}

// Videos stay paused when reduced motion is requested.
function initVideos() {
  if (!reduced()) return;
  document.querySelectorAll('video').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
}

export function initLabs() {
  const run = () => { initField(); initCopy(); initVideos(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
}
