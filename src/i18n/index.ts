import common from './common.json' with { type: 'json' };
import home from './home.json' with { type: 'json' };
import skill from './skill.json' with { type: 'json' };
import skills from './skills.json' with { type: 'json' };

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

// Each bundle stores both languages in one file ({ de: {...}, en: {...} }),
// which is the "single_file" structure the CMS edits.
// common = header, footer, shared labels · home = start page · skill = detail page and previews
// skills = the texts of every skill, keyed by slug (structure stays in src/data/skills.ts).
const bundles = { common, home, skill, skills };
type Bundles = typeof bundles;

export function toLocale(value: string | undefined): Locale {
  return value === 'en' ? 'en' : 'de';
}

const isEmpty = (value: unknown) => value === undefined || value === null || (typeof value === 'string' && value.trim() === '');

// Missing or empty English values fall back to German, field by field.
export function withFallback<T>(base: T, override: unknown): T {
  if (isEmpty(override)) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(override) || override.length === 0) return base;
    return override.map((item, index) => withFallback(base[index] ?? item, item)) as T;
  }
  if (base && typeof base === 'object') {
    if (typeof override !== 'object' || Array.isArray(override)) return base;
    const result: Record<string, unknown> = { ...(override as Record<string, unknown>) };
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      result[key] = withFallback(value, (override as Record<string, unknown>)[key]);
    }
    return result as T;
  }
  return override as T;
}

export function texts<K extends keyof Bundles>(name: K, locale: string | undefined): Bundles[K]['de'] {
  const bundle = bundles[name];
  return toLocale(locale) === 'en' ? withFallback(bundle.de, bundle.en) : bundle.de;
}

// Replaces {name} placeholders.
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Minimal inline formatting for editable texts: *accent*, **bold**, `code`, [link](url), line breaks.
export function rich(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code class="inl">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />');
}

// Plain text for attributes (aria-label, meta): formatting marks removed.
export function plain(value: string) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*+/g, '').replace(/`/g, '').replace(/\n/g, ' ');
}

export const localePrefix = (locale: string | undefined) => (toLocale(locale) === 'en' ? '/en' : '');

// Internal links keep the current language; external links, downloads and assets stay untouched.
export function localizeHref(href: string, locale: string | undefined) {
  if (toLocale(locale) === 'de' || !href.startsWith('/') || href.startsWith('//')) return href;
  if (/^\/(skills|labs|brand|admin|_astro)(\/|$|#|\?)/.test(href) || /^\/[^/]+\.[a-z0-9]+$/i.test(href)) return href;
  return href === '/' ? '/en' : `/en${href}`;
}

export function stripLocale(path: string) {
  const stripped = path.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export function pathFor(path: string, locale: Locale) {
  const base = stripLocale(path);
  if (locale === 'de') return base;
  return base === '/' ? '/en' : `/en${base}`;
}
