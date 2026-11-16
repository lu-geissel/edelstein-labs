// Generates public/admin/config.yml for Sveltia CMS from the German text files in src/i18n/.
// Run after adding or renaming text fields (or adding a skill): node scripts/build-cms-config.mjs
// (JSON is valid YAML, so the generated file is plain JSON.)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = 'lu-geissel/edelstein-labs';

const files = [
  { name: 'home', label: 'Startseite', file: 'src/i18n/home.json' },
  { name: 'skills', label: 'Skills – Texte je Skill', file: 'src/i18n/skills.json' },
  { name: 'skill', label: 'Skill-Seiten – Überschriften, Installation, Vorschau-Beschriftungen', file: 'src/i18n/skill.json' },
  { name: 'common', label: 'Überall: Kopfzeile, Fußzeile, Sprachumschalter', file: 'src/i18n/common.json' },
];

// German labels for the editor; unknown keys fall back to the key itself.
const labels = {
  meta: 'Google & Teilen (Titel, Beschreibung)', title: 'Titel', description: 'Beschreibung', heading: 'Überschrift',
  label: 'Bezeichnung', text: 'Text', intro: 'Einleitung', button: 'Button', note: 'Hinweis', support: 'Text neben der Überschrift',
  hero: 'Einstieg (großer Titel oben)', coordsLeft: 'Kopfzeile im Bild – links', coordsMiddle: 'Kopfzeile im Bild – Mitte',
  live: 'Kopfzeile im Bild – rechts („live“)', lead: 'Text unter dem Titel', primary: 'Haupt-Button', secondary: 'Zweiter Button',
  readout: 'Kennzahlen-Kasten', triggers: 'Kennzahl „Auslöser“', price: 'Kennzahl „Preis“', currency: 'Währung',
  start: 'Kennzahl „Start“', minutes: 'Einheit Minuten', numberWords: 'Zahlwörter (0 bis 10)',
  why: 'Abschnitt „Warum kostenlos“', skillTitle: 'Linke Liste – Überschrift', skillTag: 'Linke Liste – Kennzeichen',
  skill: 'Linke Liste – Einträge', humanTitle: 'Rechte Liste – Überschrift', humanTag: 'Rechte Liste – Kennzeichen',
  human: 'Rechte Liste – Einträge', outro: 'Schlussabsätze', cta: 'Schluss-Aufruf (Gespräch)',
  // Skill detail page
  card: 'Skill-Kachel (Startseite)', details: 'Link „Details ansehen“', beta: 'Kennzeichen „Beta“', nav: 'Navigation',
  back: 'Link zurück zur Übersicht', actions: 'Buttons & Hinweise', download: 'Download-Button', github: 'GitHub-Link',
  extra: 'Hinweis auf weitere Downloads', sections: 'Abschnittsüberschriften', problem: 'Das Problem', how: 'So funktioniert’s',
  step: 'Schritt-Nummer', sample: 'Beispiel-Ausgabe', builtFor: 'Built for', install: 'Installations-Kasten',
  platforms: 'Kopfzeile rechts', claudeAi: 'Spalte claude.ai – Titel', claudeAiText: 'Spalte claude.ai – Text',
  claudeCode: 'Spalte Claude Code – Titel', marketplace: 'Variante a) – Text', manual: 'Variante b) – Text',
  copy: 'Kopieren-Knopf', copied: 'Kopieren-Knopf nach Klick', noClaude: 'Hinweis „Kein Claude?“',
  // Preview labels (detail page)
  brandProfile: 'Brand Design Studio – Titel', extracted: 'Brand Design Studio – Status', strategyGuide: 'Brand Strategist – Titel',
  done: 'Brand Strategist – Status', voiceFile: 'Voiceprint – Titel', samples: 'Voiceprint – Status', running: 'Ablauf – Status',
  prompt: 'Fable Prompter – Titel', optimised: 'Fable Prompter – Status', draft: 'Jour Fixe – Status',
  graphLabel: 'Strategie-Grafik (Screenreader)', headline: 'Schrift Überschrift', body: 'Text', voiceover: 'Sprechertext',
  animation: 'Animation', words: 'Wortzahl', substance: 'Substance', positioning: 'Positioning', dna: 'Voice DNA',
  uses: 'Nutzt', avoids: 'Vermeidet', waiting: 'Schritt-Status „wartet“', ok: 'Schritt-Status „ok“', before: 'Vorher',
  after: 'Nachher', openQuestion: 'Offene Frage',
  // Skill texts
  tagline: 'Kurzbeschreibung (Kachel)', subheading: 'Untertitel (Detailseite)', bullets: 'Stichpunkte', howItWorks: 'So funktioniert’s – Schritte',
  whyBuilt: 'Warum ich das gebaut habe', sampleOutput: 'Beispiel-Ausgabe', preview: 'Vorschau (Kasten rechts oben)',
  // Shared
  site: 'Website allgemein', mainSiteUrl: 'Link zur Hauptseite', header: 'Kopfzeile', logoHome: 'Logo – zur Startseite (Screenreader)',
  logoAlt: 'Logo – Bildbeschreibung', main: 'Hauptnavigation (Screenreader)', skills: 'Link „Skills“', mainSite: 'Link zur Hauptseite – Text',
  footer: 'Fußzeile', imprint: 'Link Impressum', privacy: 'Link Datenschutz', copyright: 'Copyright-Zeile',
  language: 'Sprachumschalter', switchTo: 'Umschalter – Text für Screenreader', id: 'Kennung', slug: 'Kennung',
};
// Labels that depend on where a key sits ("parent.key"), checked per file first.
const contextLabels = {
  home: {
    'meta.title': 'Seitentitel', 'readout.label': 'Kasten (Screenreader)', 'readout.title': 'Kasten – Überschrift',
    'readout.skills': 'Kennzahl „Skills“', 'skills': 'Abschnitt „Skills“', 'cta.text': 'Text', 'cta.note': 'Kleingedrucktes unter dem Button',
    'intro': 'Einleitung (rechts)',
  },
  skill: {
    'meta.title': 'Seitentitel', 'meta.description': 'Beschreibung für Google', 'actions.note': 'Kennzeichen über dem Hinweis',
    'install.title': 'Kopfzeile links', 'preview': 'Vorschau-Kasten – Beschriftungen', 'sections.why': 'Warum ich das gebaut habe',
  },
  skills: {
    'preview.label': 'Titel der Vorschau', 'preview.steps': 'Schritte', 'preview.note': 'Hinweis unten', 'preview.tones': 'Tonalität',
    'preview.scene': 'Szene', 'preview.uses': 'Wörter „Nutzt“', 'preview.avoids': 'Wörter „Vermeidet“', 'preview.cover': 'Titel des Decks',
    'preview.slides': 'Folien', 'preview.open': 'Offene Frage', 'note': 'Hervorgehobener Hinweis „Wichtig“', 'howItWorks.title': 'Titel',
    'howItWorks.body': 'Text', 'slides.title': 'Titel', 'slides.body': 'Text', 'problem': 'Das Problem',
  },
  common: {
    'header.badge': 'Kennzeichen neben dem Logo', 'header.github': 'Link „GitHub“', 'header.skills': 'Link „Skills“',
    'footer.description': 'Text unter dem Logo', 'footer.label': 'Fußzeilen-Navigation (Screenreader)', 'footer.github': 'Link „GitHub“',
    'language.label': 'Umschalter (Screenreader)', badge: 'Hinweis „Works with Claude“', 'badge.title': 'Hinweis beim Darüberfahren',
    'badge.text': 'Text', 'site.mainSiteUrl': 'Link zur Hauptseite (in dieser Sprache)',
  },
};

const hints = {
  heading: '*Wörter zwischen Sternchen* werden orange hervorgehoben.',
  claudeAiText: '**fett** und `Code` werden formatiert.',
  noClaude: '**fett** und `Code` werden formatiert.',
  numberWords: 'Die Überschrift „{count} Skills …“ nimmt das Wort an der Stelle der Skill-Anzahl.',
  copyright: '{year} wird automatisch ersetzt.', step: '{n} wird automatisch ersetzt.', samples: '{count} wird automatisch ersetzt.',
  words: '{count} wird automatisch ersetzt.', graphLabel: '{steps} wird automatisch ersetzt.',
  sampleOutput: 'Zeilenumbrüche bleiben genau so erhalten.',
  mainSiteUrl: 'Englisch: https://edelsteinstrategie.de/en',
};
const contextHints = {
  'skill:meta.title': '{name} wird automatisch durch den Skill-Namen ersetzt.',
  'skill:meta.description': '{subheading} wird automatisch durch den Untertitel des Skills ersetzt.',
  'home:skills.heading': '{count} wird durch das Zahlwort ersetzt. *Wörter zwischen Sternchen* werden orange hervorgehoben.',
  'skills:preview.steps': 'Anzahl und Reihenfolge sind fest (Status der Schritte steht im Code).',
};

// Keys that identify an item and must stay the same in both languages.
const identityKeys = new Set(['id', 'slug']);
// Lists whose length and order are fixed by the site's logic.
const fixedLists = new Set(['numberWords', 'steps']);

const humanize = key => labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
// Skill slugs as headings: "brand-design-studio" → "Brand Design Studio".
const slugTitle = slug => slug.split('-').map(w => (w === 'linkedin' ? 'LinkedIn' : w[0].toUpperCase() + w.slice(1))).join(' ');

// One representative item per list: keeps the richest value of every key across all items.
function sampleOf(items) {
  const sample = {};
  for (const item of items.filter(entry => entry && typeof entry === 'object')) {
    for (const [key, value] of Object.entries(item)) {
      const current = sample[key];
      if (current === undefined || (Array.isArray(current) && current.length === 0) || current === '') sample[key] = value;
    }
  }
  return sample;
}

function field(file, key, value, parent = '') {
  const ctx = contextLabels[file] || {};
  const label = ctx[`${parent}.${key}`] || ctx[key] || humanize(key);
  const hint = contextHints[`${file}:${parent}.${key}`] || hints[key];
  const base = { name: key, label, ...(hint ? { hint } : {}) };
  if (identityKeys.has(key)) return { ...base, widget: 'hidden', i18n: 'duplicate' };
  if (Array.isArray(value)) {
    const fixed = fixedLists.has(key);
    const list = {
      ...base, widget: 'list', i18n: true, collapsed: false, required: false,
      ...(fixed ? { allow_add: false, allow_remove: false, allow_reorder: false } : {}),
    };
    // A list of plain texts gets a single text field per entry.
    if (value.every(item => typeof item === 'string')) {
      const long = value.some(item => item.length > 90);
      return { ...list, field: { name: 'item', label: 'Eintrag', widget: long ? 'text' : 'string', i18n: true, required: ['de'] } };
    }
    const sample = sampleOf(value);
    return { ...list, fields: Object.entries(sample).map(([k, v]) => field(file, k, v, key)) };
  }
  if (value && typeof value === 'object') {
    return { ...base, widget: 'object', i18n: true, collapsed: false, fields: Object.entries(value).map(([k, v]) => field(file, k, v, key)) };
  }
  if (typeof value === 'number') return { ...base, widget: 'number', i18n: 'duplicate' };
  const long = typeof value === 'string' && (value.length > 90 || value.includes('\n'));
  // German is required; an empty English field falls back to German on the site.
  return { ...base, widget: long ? 'text' : 'string', i18n: true, required: value === '' ? false : ['de'] };
}

function fileFields(name, data) {
  // skills.json is keyed by slug: one collapsible group per skill, titled with the skill name.
  if (name === 'skills') {
    return Object.entries(data).map(([slug, value]) => ({
      name: slug, label: slugTitle(slug), widget: 'object', i18n: true, collapsed: true,
      fields: Object.entries(value).map(([k, v]) => field(name, k, v, slug)),
    }));
  }
  return Object.entries(data).map(([k, v]) => field(name, k, v, name));
}

const textCollection = {
  name: 'texte',
  label: 'Labs-Texte',
  description: 'Alle Texte von Edelstein Labs, links Deutsch, rechts Englisch. Leere englische Felder zeigen auf der Website den deutschen Text. Ein neuer Skill wird zuerst im Code angelegt (src/data/skills.ts), dann erscheint er hier.',
  i18n: true,
  editor: { preview: false },
  files: files.map(({ name, label, file }) => {
    const data = JSON.parse(readFileSync(join(root, file), 'utf8'));
    return { name, label, file, format: 'json', i18n: true, fields: fileFields(name, data.de) };
  }),
};

const config = {
  backend: {
    name: 'github',
    repo,
    branch: 'main',
    // The OAuth function lives on the main website and allows this origin.
    base_url: 'https://edelsteinstrategie.de',
    auth_endpoint: 'api/cms-auth',
    commit_messages: { update: 'Texte bearbeitet: {{collection}} – {{slug}}' },
  },
  media_folder: 'public/labs/cms',
  public_folder: '/labs/cms',
  site_url: 'https://labs.edelsteinstrategie.de',
  display_url: 'https://labs.edelsteinstrategie.de',
  i18n: { structure: 'single_file', locales: ['de', 'en'], default_locale: 'de' },
  output: { omit_empty_optional_fields: true, json: { indent_style: 'space', indent_size: 2 } },
  collections: [textCollection],
};

const target = join(root, 'public/admin/config.yml');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, `# Generated by scripts/build-cms-config.mjs – edit the script, not this file.\n${JSON.stringify(config, null, 2)}\n`);
console.log(`CMS-Konfiguration geschrieben: ${target}`);
