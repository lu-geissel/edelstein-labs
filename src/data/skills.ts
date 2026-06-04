export const GITHUB_REPO_URL = 'https://github.com/lu-geissel/edelstein-skills';
export const MARKETPLACE = 'edelstein-skills';
export const MAIN_SITE = 'https://edelsteinstrategie.de';

export interface SkillStep {
  title: string;
  body: string;
}

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
    };

export interface Skill {
  slug: string;
  name: string;
  tagline: string;
  subheading: string;
  bullets: string[];
  status: 'stable' | 'beta';
  tag: string;
  downloadUrl: string;
  githubUrl: string;
  sampleOutput: string;
  problem: string;
  howItWorks: SkillStep[];
  whyBuilt: string;
  builtFor: string[];
  triggers: string[];
  preview: SkillPreview;
}

export const skills: Skill[] = [
  {
    slug: 'brand-design-studio',
    name: 'Brand Design Studio',
    tagline: 'Aus Brand-Material wird konsistentes Design – in jedem Format.',
    subheading:
      'Markenrichtlinien aus PDF, Website, Bild oder Text extrahieren und auf jedes Output-Format anwenden.',
    bullets: [
      'Extrahiert Farben, Fonts, Tonalität und Persönlichkeit aus beliebigen Quellen',
      'Baut ein einheitliches Brand-Profil pro Session',
      'Wendet es auf Social Posts, Decks, Dokumente, Web und mehr an',
    ],
    status: 'stable',
    tag: 'Design',
    downloadUrl: '/skills/brand-design-studio.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/brand-design-studio`,
    sampleOutput: `{
  "brand_profile": {
    "colors": {
      "primary": "#1A2E25",
      "secondary": "#F2F0E9",
      "accent": "#5B2C6F"
    },
    "fonts": {
      "headline": "Playfair Display",
      "body": "Inter"
    },
    "tone": ["präzise", "editorial", "selbstsicher"]
  }
}`,
    problem:
      'Jedes neue Asset bedeutet, Farben, Fonts und Stil wieder neu zusammenzusuchen. Die Marke franst aus, je mehr Hände und Tools beteiligt sind.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden (siehe unten).' },
      { title: 'Brand-Material geben', body: 'Style-Guide-PDF, Website-URL, Logo oder eine kurze Beschreibung reinwerfen. Der Skill extrahiert ein Brand-Profil.' },
      { title: 'Output anfordern', body: 'Post, Deck, Dokument oder Grafik anfordern – on-brand, in den richtigen Maßen.' },
    ],
    whyBuilt:
      'Ich baue ständig Assets für unterschiedliche Marken. Statt jedes Mal von vorn anzufangen, sollte ein Skill das Brand-Profil einmal sauber erfassen und konsistent anwenden.',
    builtFor: ['Jedes LLM – Claude, ChatGPT, Gemini & Co.', 'Python-Extraktionsscripts (PDF, Website, Bild)', 'Referenz-Guides für Output-Formate'],
    triggers: ['brand profile', 'on-brand design', 'social post', 'pitch deck', 'style guide', 'car wrap'],
    preview: {
      kind: 'brand-profile',
      colors: [
        { label: 'Primary', hex: '#1A2E25' },
        { label: 'Paper', hex: '#F2F0E9' },
        { label: 'Accent', hex: '#5B2C6F' },
      ],
      fonts: { headline: 'Playfair Display', body: 'Inter' },
      tones: ['präzise', 'editorial', 'selbstsicher'],
    },
  },
  {
    slug: 'video-script-writer',
    name: 'Video Script Writer',
    tagline: 'Produktionsreife Skripte für animierte Erklär- und Werbevideos.',
    subheading:
      'Ein 5-Phasen-Workflow vom Briefing bis zum fertigen, formatierten Skript-Dokument.',
    bullets: [
      'Wählt das passende Story-Framework (PAS, StoryBrand, AIDA, ...)',
      'Drei Quality-Passes: technisch, strategisch, kreativ',
      'Gibt ein fertiges Template-Dokument aus',
    ],
    status: 'stable',
    tag: 'Content',
    downloadUrl: '/skills/video-script-writer.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/video-script-writer`,
    sampleOutput: `SZENE 1 (0:00–0:06)

Sprechertext:
"Du hast die beste Technik im Raum. Nur weiß es niemand."

Animation:
Kamera fährt langsam über ein leeres Büro. Ein
einzelnes Display leuchtet auf, der Rest bleibt dunkel.`,
    problem:
      'Ein gutes Video-Skript muss in Wortzahl, Timing und Hook exakt sitzen. Das von Hand sauber zu halten kostet Stunden und bricht bei jeder Korrekturschleife.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden.' },
      { title: 'Briefing geben', body: 'Produkt, Zielgruppe, Länge und Ton angeben. Der Skill analysiert und wählt ein Framework.' },
      { title: 'Skript erhalten', body: 'Szene-für-Szene-Skript mit Sprechertext und Animation, nach drei Quality-Passes, als fertiges Dokument.' },
    ],
    whyBuilt:
      'Ich schreibe seit Jahren Skripte für animierte Videos. Den immer gleichen Qualitätsprozess habe ich in einen Skill gegossen, damit der Entwurf schon mit sitzendem Hook und korrekter Wortzahl ankommt.',
    builtFor: ['Jedes LLM – Claude, ChatGPT, Gemini & Co.', 'python-docx Template-Script', 'Beispiel-Briefings als Referenz'],
    triggers: ['video script', 'erklärvideo', 'storyboard', 'voiceover', 'hook', 'framework'],
    preview: {
      kind: 'script-scene',
      scene: 'SZENE 1',
      timecode: '0:00 – 0:06',
      voiceover: 'Du hast die beste Technik im Raum. Nur weiß es niemand.',
      animation: 'Kamera fährt über ein leeres Büro. Ein einzelnes Display leuchtet auf.',
      words: 142,
    },
  },
  {
    slug: 'brand-strategist',
    name: 'Brand Strategist',
    tagline: 'Strategischer Marken-Berater: von der Substanz bis zur Botschaft.',
    subheading:
      'Eine strukturierte Methodik für Brand Substance, Positionierung, Persona, Messaging, Storytelling und Naming.',
    bullets: [
      'Deckt den ganzen Strategie-Stack: Substanz, Positionierung, Persona, Messaging',
      'Strukturierte, nachvollziehbare Methodik statt Bauchgefühl',
      'Produziert einen vollständigen Brand Strategy Guide',
    ],
    status: 'stable',
    tag: 'Strategie',
    downloadUrl: '/skills/brand-strategist.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/brand-strategist`,
    sampleOutput: `BRAND SUBSTANCE
Kern: Verantwortung übernehmen, bevor sie
formal übertragen ist.

POSITIONING STATEMENT
Für Tech-Mittelständler im DACH-Raum, die
fachlich stark, aber kommunikativ unsichtbar
sind, ist [Marke] der Partner, der aus
Substanz eine tragfähige Botschaft macht.`,
    problem:
      'Markenstrategie bleibt oft vage. Es fehlt der strukturierte Weg von den Werten eines Unternehmens zu einer konkreten, tragfähigen Botschaft.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden.' },
      { title: 'Briefing oder Kontext geben', body: 'Unternehmen, Markt und Ziel beschreiben. Der Skill führt strukturiert durch die Strategie-Bausteine.' },
      { title: 'Strategy Guide erhalten', body: 'Von Brand Substance über Positionierung bis Messaging und Naming – als zusammenhängender Brand Strategy Guide.' },
    ],
    whyBuilt:
      'Markenstrategie ist mein Kerngeschäft. Diesen Skill nutze ich, um den Strategie-Prozess strukturiert und reproduzierbar zu machen, ohne dass die Substanz verloren geht.',
    builtFor: ['Jedes LLM – Claude, ChatGPT, Gemini & Co.', 'Strukturierte Referenz-Guides je Strategie-Baustein', 'Anonymisierte Beispiel-Outputs'],
    triggers: ['brand strategy', 'positioning', 'brand persona', 'messaging', 'naming', 'competitor audit'],
    preview: {
      kind: 'strategy',
      substance: 'Verantwortung übernehmen, bevor sie formal übertragen ist.',
      positioning: 'Für Tech-Mittelständler im DACH-Raum, die fachlich stark, aber kommunikativ unsichtbar sind.',
      steps: ['Substance', 'Positioning', 'Persona', 'Messaging', 'Naming'],
    },
  },
];
