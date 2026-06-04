// Edelstein Labs — scroll reveal, parallax, typewriter, copy buttons
const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'));
  if (!els.length) return;
  if (reduced()) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('in'), delay);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => obs.observe(el));
}

// Pointer + scroll parallax for [data-parallax] (data-depth = strength px)
function initParallax() {
  if (reduced()) return;
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!items.length) return;

  let px = 0, py = 0; // pointer offset -1..1
  const onMove = (e: PointerEvent) => {
    px = (e.clientX / window.innerWidth - 0.5) * 2;
    py = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const tick = () => {
    items.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '12');
      const rot = parseFloat(el.dataset.rot || '0');
      const tx = px * depth;
      const ty = py * depth;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot}deg)`;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Typewriter for [data-typewriter] — types its own textContent once visible
function initTypewriter() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-typewriter]'));
  if (!els.length) return;
  els.forEach((el) => {
    const full = el.textContent || '';
    if (reduced()) { el.textContent = full; return; }
    el.textContent = '';
    el.classList.add('caret');
    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          let i = 0;
          const speed = parseInt(el.dataset.speed || '26', 10);
          const type = () => {
            if (i <= full.length) {
              el.textContent = full.slice(0, i);
              i++;
              setTimeout(type, speed);
            } else {
              setTimeout(() => el.classList.remove('caret'), 1200);
            }
          };
          type();
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.6 });
    obs.observe(el);
  });
}

function initCopy() {
  const btns = Array.from(document.querySelectorAll<HTMLElement>('[data-copy]'));
  btns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.getAttribute('data-label') || btn.textContent || '';
        btn.setAttribute('data-state', 'copied');
        const labelEl = btn.querySelector('[data-copy-label]');
        if (labelEl) {
          labelEl.textContent = 'Kopiert ✓';
          setTimeout(() => { labelEl.textContent = prev; btn.removeAttribute('data-state'); }, 1600);
        }
      } catch { /* clipboard blocked */ }
    });
  });
}

export function initLabs() {
  const run = () => { initReveal(); initParallax(); initTypewriter(); initCopy(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}
