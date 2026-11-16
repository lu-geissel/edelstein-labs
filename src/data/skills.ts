import { texts } from '../i18n';

export const GITHUB_REPO_URL = 'https://github.com/lu-geissel/edelstein-skills';
export const MARKETPLACE = 'edelstein-skills';
export const MAIN_SITE = 'https://edelsteinstrategie.de';

/* Structure of every skill lives here; all readable texts (tagline, bullets, steps,
   sample output, preview wording …) live in src/i18n/skills.json under the same slug,
   in German and English. getSkills(locale) merges both. */

export interface SkillStep {
  title: string;
  body: string;
}

type StepState = 'done' | 'gate' | 'todo';

/* Preview = the animated mock-UI "snapshot" shown per skill */
export type SkillPreview =
  | {
      kind: 'brand-profile';
      colors: { label: string; hex: string }[];
      fonts: { headline: string; body: string };
      tones: string[];
    }
  | {
      kind: 'script-scene';
      scene: string;
      timecode: string;
      voiceover: string;
      animation: string;
      words: number;
    }
  | {
      kind: 'strategy';
      substance: string;
      positioning: string;
      steps: string[];
    }
  | {
      kind: 'voice-profile';
      samples: number;
      dna: string;
      uses: string[];
      avoids: string[];
    }
  | {
      kind: 'pipeline';
      label: string;
      steps: { name: string; state: StepState }[];
      note: string;
    }
  | {
      kind: 'prompt';
      before: string;
      after: string;
    }
  | {
      kind: 'deck';
      cover: string;
      slides: { title: string; body: string }[];
      open: string;
    };

/* Structural part of a preview: everything that is not wording. */
type PreviewStructure =
  | { kind: 'brand-profile'; colors: { label: string; hex: string }[]; fonts: { headline: string; body: string } }
  | { kind: 'script-scene'; timecode: string; words: number }
  | { kind: 'strategy'; steps: string[] }
  | { kind: 'voice-profile'; samples: number }
  | { kind: 'pipeline'; states: StepState[] }
  | { kind: 'prompt' }
  | { kind: 'deck' };

export interface SkillDownload {
  label: string;
  url: string;
}

export interface Skill {
  slug: string;
  name: string;
  tagline: string;
  subheading: string;
  bullets: string[];
  status: 'stable' | 'beta';
  tag: string;
  /* Optional: hervorgehobener Hinweis unter den Bullets auf der Detailseite */
  note?: string;
  downloadUrl: string;
  /* Optional: further .skill files belonging to the same plugin */
  extraDownloads?: SkillDownload[];
  githubUrl: string;
  sampleOutput: string;
  problem: string;
  howItWorks: SkillStep[];
  whyBuilt: string;
  builtFor: string[];
  triggers: string[];
  preview: SkillPreview;
}

interface SkillStructure {
  slug: string;
  name: string;
  status: 'stable' | 'beta';
  tag: string;
  downloadUrl: string;
  extraDownloads?: SkillDownload[];
  githubUrl: string;
  /* Search keywords, identical in both languages. */
  triggers: string[];
  preview: PreviewStructure;
}

const structure: SkillStructure[] = [
  {
    slug: 'brand-design-studio',
    name: 'Brand Design Studio',
    status: 'stable',
    tag: 'Design',
    downloadUrl: '/skills/brand-design-studio.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/brand-design-studio`,
    triggers: ['brand profile', 'on-brand design', 'social post', 'pitch deck', 'style guide', 'car wrap'],
    preview: {
      kind: 'brand-profile',
      colors: [
        { label: 'Dark', hex: '#211E1A' },
        { label: 'Paper', hex: '#F2F0EB' },
        { label: 'Accent', hex: '#FF3B18' },
      ],
      fonts: { headline: 'Playfair Display', body: 'Inter' },
    },
  },
  {
    slug: 'video-script-writer',
    name: 'Video Script Writer',
    status: 'stable',
    tag: 'Content',
    downloadUrl: '/skills/video-script-writer.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/video-script-writer`,
    triggers: ['video script', 'erklärvideo', 'storyboard', 'voiceover', 'hook', 'framework'],
    preview: { kind: 'script-scene', timecode: '0:00 – 0:06', words: 142 },
  },
  {
    slug: 'brand-strategist',
    name: 'Brand Strategist',
    status: 'stable',
    tag: 'Strategie',
    downloadUrl: '/skills/brand-strategist.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/brand-strategist`,
    triggers: ['brand strategy', 'positioning', 'brand persona', 'messaging', 'naming', 'competitor audit'],
    preview: { kind: 'strategy', steps: ['Substance', 'Positioning', 'Persona', 'Messaging', 'Naming'] },
  },
  {
    slug: 'voiceprint',
    name: 'Voiceprint',
    status: 'stable',
    tag: 'Voice',
    downloadUrl: '/skills/voiceprint.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/voiceprint`,
    triggers: ['voice profile', 'schreibstil', 'klingt nach mir', 'tone of voice', 'anti-slop'],
    preview: { kind: 'voice-profile', samples: 12 },
  },
  {
    slug: 'linkedin-content-creation',
    name: 'LinkedIn Content Creation',
    status: 'stable',
    tag: 'Content',
    downloadUrl: '/skills/linkedin-post.skill',
    extraDownloads: [{ label: 'linkedin-draft.skill', url: '/skills/linkedin-draft.skill' }],
    githubUrl: `${GITHUB_REPO_URL}/tree/main/linkedin-content-creation`,
    triggers: ['linkedin post', 'sprachnotiz', 'hook', 'angle brief', 'faktencheck'],
    preview: { kind: 'pipeline', states: ['done', 'done', 'gate', 'todo', 'todo'] },
  },
  {
    slug: 'jour-fixe',
    name: 'Jour Fixe',
    status: 'stable',
    tag: 'Ops',
    downloadUrl: '/skills/jour-fixe.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/jour-fixe`,
    triggers: ['jour fixe', 'weekly', 'status meeting', 'wochenupdate', 'deck'],
    preview: { kind: 'deck' },
  },
  {
    slug: 'session-handoff',
    name: 'Session Handoff',
    status: 'stable',
    tag: 'Memory',
    downloadUrl: '/skills/session-handoff.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/session-handoff`,
    triggers: ['handoff', 'session ende', 'status.md', 'übergabe', 'weitermachen'],
    preview: { kind: 'pipeline', states: ['done', 'done', 'done', 'gate'] },
  },
  {
    slug: 'fable-prompter',
    name: 'Fable Prompter',
    status: 'stable',
    tag: 'Prompting',
    downloadUrl: '/skills/fable-prompter.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/fable-prompter`,
    triggers: ['prompt schreiben', 'prompt optimieren', 'tokens sparen', 'cowork', 'fable 5'],
    preview: { kind: 'prompt' },
  },
];

export const skillSlugs = structure.map((s) => s.slug);

type SkillTexts = Omit<Skill, keyof SkillStructure> & { preview: Record<string, unknown> };

function mergePreview(base: PreviewStructure, words: Record<string, unknown>): SkillPreview {
  if (base.kind === 'pipeline') {
    const { states, ...rest } = base;
    const names = (words.steps as string[] | undefined) ?? [];
    return { ...rest, ...words, steps: states.map((state, i) => ({ name: names[i] ?? '', state })) } as SkillPreview;
  }
  return { ...base, ...words } as SkillPreview;
}

/* All skills with their texts in the given language (missing English falls back to German). */
export function getSkills(locale: string | undefined): Skill[] {
  const all = texts('skills', locale) as unknown as Record<string, SkillTexts>;
  return structure.map((base) => {
    const t = all[base.slug];
    if (!t) throw new Error(`src/i18n/skills.json: Texte für "${base.slug}" fehlen.`);
    return { ...base, ...t, preview: mergePreview(base.preview, t.preview) } as Skill;
  });
}

export const skills: Skill[] = getSkills('de');
