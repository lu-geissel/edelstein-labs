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
      steps: { name: string; state: 'done' | 'gate' | 'todo' }[];
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
  {
    slug: 'voiceprint',
    name: 'Voiceprint',
    tagline: 'Deine Schreibstimme als Datei – statt als Prompt, den du jedes Mal neu tippst.',
    subheading:
      'Aus 3 bis 20 echten Texten wird ein VOICE.md, das jede AI vor dem Schreiben liest.',
    bullets: [
      'Analysiert Rhythmus, Wortschatz, Eigenheiten und deine No-Gos – mit Belegzitat',
      'Selbsttest eingebaut: schreibt eine Probe und vergleicht sie gegen deine Originale',
      'Anti-Slop-Liste: die AI-Floskeln, die in keinem Text auftauchen dürfen',
    ],
    status: 'stable',
    tag: 'Voice',
    downloadUrl: '/skills/voiceprint.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/voiceprint`,
    sampleOutput: `## Voice DNA
Kurze Aussagesätze, konkrete Zahlen, trockener
Humor, null Konzern-Polster.

## Lexikon
### Nutzt
- "liefern" (statt "bereitstellen")
### Vermeidet
- "spannend", "Mehrwert", "abholen"

## Klingt falsch (plausibel für eine AI, fremd für dich)
- "Lass uns tief eintauchen."`,
    problem:
      'AI-Texte klingen nach AI. Man erkennt es an denselben Floskeln, demselben Rhythmus, denselben Dreiklängen. Und man tippt in jedem Chat aufs Neue "schreib in meinem Stil" – ohne je gesagt zu haben, was das eigentlich heißt.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden (siehe unten).' },
      { title: 'Texte geben', body: 'Mindestens 3, ideal 10+ Texte, die du selbst geschrieben hast – Mails, Posts, Angebote. Gemischte Formate sind besser als ein einziges.' },
      { title: 'VOICE.md erhalten', body: 'Ein Profil mit Belegzitaten, plus eine Schreibprobe, die neben deinen Originalen steht. Deine Korrekturen wandern zurück ins Profil.' },
    ],
    whyBuilt:
      'Ich schreibe für mehrere Marken plus mich selbst. Prompt-Imitation driftet – ein geschriebenes Profil nicht. Es ist überprüfbar, versionierbar und wird mit jeder Korrektur besser, statt bei jedem neuen Chat bei null anzufangen.',
    builtFor: ['Jedes LLM – Claude, ChatGPT, Gemini & Co.', 'Eine einzige Datei, die überall gelesen wird', 'Greift direkt in die LinkedIn Pipeline'],
    triggers: ['voice profile', 'schreibstil', 'klingt nach mir', 'tone of voice', 'anti-slop'],
    preview: {
      kind: 'voice-profile',
      samples: 12,
      dna: 'Kurze Aussagesätze, konkrete Zahlen, trockener Humor, null Konzern-Polster.',
      uses: ['liefern', 'kostet', 'konkret'],
      avoids: ['Mehrwert', 'spannend', 'abholen'],
    },
  },
  {
    slug: 'linkedin-pipeline',
    name: 'LinkedIn Pipeline',
    tagline: 'Von der Sprachnotiz zum fertigen Post – mit zwei Stopps, an denen du entscheidest.',
    subheading:
      'Ingest → Angle → Freigabe → Draft → Freigabe. Hook zuerst, Faktencheck-Pflicht, Edit-Pass mit frischem Blick.',
    bullets: [
      'Transkribiert Sprachnotizen und Videos lokal und destilliert einen Winkel daraus',
      'Zwei harte Freigabe-Gates: nichts läuft ohne dein Wort durch',
      'Jede Zahl im Draft bekommt einen Faktencheck-Marker – keine erfundenen Belege',
    ],
    status: 'stable',
    tag: 'Content',
    downloadUrl: '/skills/linkedin-post.skill',
    extraDownloads: [{ label: 'linkedin-draft.skill', url: '/skills/linkedin-draft.skill' }],
    githubUrl: `${GITHUB_REPO_URL}/tree/main/linkedin-pipeline`,
    sampleOutput: `HOOKS (6 Kandidaten, ★ = Empfehlung)

★ 2 · [Zahl] "Drei Wochen Ausschreibung. Und dann
  entscheidet der Preis."
  3 · [Szene] "Der Techniker stand um 6:40 vor
  einer verschlossenen Tür."

[FAKTENCHECK: 3 Wochen – mit Klient bestätigen]`,
    problem:
      'Der Rohstoff für gute Posts liegt in Sprachnotizen, Calls und PDFs. Was daraus wird, ist meistens entweder generisch oder eine Woche zu spät. Und wenn die AI durchläuft, steht am Ende ein Text, den so niemand freigegeben hat.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden. Enthält zwei Skills: die Pipeline und die Schreib-Engine.' },
      { title: 'Material reinwerfen', body: 'Sprachnotiz, Video, PDF, Link oder eine grobe Idee. Beim ersten Lauf richtet der Skill deinen linkedin/-Ordner mit dir gemeinsam ein.' },
      { title: 'Zweimal entscheiden', body: 'Erst der Winkel, dann der Draft. An beiden Stellen stoppt der Skill und wartet – du schärfst nach oder gibst frei.' },
    ],
    whyBuilt:
      'Ich schreibe Posts für Klienten und für mich. Das Problem war nie das Schreiben, sondern der Winkel und die Disziplin: nicht recyceln, nichts behaupten, was keiner geprüft hat, und den Draft nicht überschreiben – weil die Differenz zwischen Entwurf und Endfassung das Einzige ist, woraus das System lernt.',
    builtFor: ['Claude Code und claude.ai', 'Lokale Transkription via ffmpeg + Whisper', 'Liest das VOICE.md aus Voiceprint'],
    triggers: ['linkedin post', 'sprachnotiz', 'hook', 'angle brief', 'faktencheck'],
    preview: {
      kind: 'pipeline',
      label: 'LinkedIn Post · 260730',
      steps: [
        { name: 'Ingest', state: 'done' },
        { name: 'Angle', state: 'done' },
        { name: 'Freigabe', state: 'gate' },
        { name: 'Draft', state: 'todo' },
        { name: 'Freigabe', state: 'todo' },
      ],
      note: 'Wartet auf dein Wort. Der Skill schreibt den Draft nicht von selbst.',
    },
  },
  {
    slug: 'jour-fixe',
    name: 'Jour Fixe',
    tagline: 'Das wöchentliche Status-Meeting, vorbereitet – inklusive der unbequemen Frage.',
    subheading:
      'Quellen ziehen, Vorwoche gegen Ist abgleichen, Slides abstimmen, nach Freigabe das Deck erzeugen.',
    bullets: [
      'Gleicht ab, was letzte Woche versprochen war, gegen das, was tatsächlich passiert ist',
      'Deine eigenen Quellen: Zeiterfassung, letztes Deck, Task-Board, mündliche Updates',
      'Output frei wählbar: Gamma-Deck, Markdown, Slide-Text oder Dokument',
    ],
    status: 'beta',
    tag: 'Ops',
    downloadUrl: '/skills/jour-fixe.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/jour-fixe`,
    sampleOutput: `ABGLEICH ZUR VORWOCHE

✓ Karriereseite – 4 Einträge, live seit Di
✓ Meta Ads – Set B pausiert, CPA 41 €
? Testimonials – kein Input in Stunden,
  Board oder Updates.

  → "Letzte Woche als Priorität gesetzt. Update,
     oder diese Woche nicht erwähnen?"`,
    problem:
      'Das wiederkehrende Meeting frisst jede Woche dieselbe Stunde: Quellen zusammensuchen, sich erinnern, was letzte Woche versprochen war, Slides bauen. Und genau der Punkt, zu dem es nichts zu sagen gibt, fällt einem erst im Termin auf.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden.' },
      { title: 'Quellen eintragen', body: 'Beim ersten Lauf fragt der Skill deine Quellen ab – Zeiterfassung, letztes Deck, Task-Board – und legt daraus eine Config an. Danach liest er sie jede Woche selbst.' },
      { title: 'Abgleichen, freigeben, erzeugen', body: 'Erst der Abgleich mit offenen Fragen, dann der Slide-Entwurf im Chat. Das Deck entsteht erst nach deinem Wort.' },
    ],
    whyBuilt:
      'Der Wert dieses Meetings hängt an einer einzigen Stelle: dem ehrlichen Abgleich zwischen dem, was geplant war, und dem, was passiert ist. Alles andere ist Formatierung. Also macht der Skill den Abgleich zuerst – und fragt nach, statt eine Lücke zu überspielen.',
    builtFor: ['Claude Code und claude.ai', 'Gamma, Markdown, Slides oder Dokument', 'Beliebige Quellen via Integration oder Upload'],
    triggers: ['jour fixe', 'weekly', 'status meeting', 'wochenupdate', 'deck'],
    preview: {
      kind: 'deck',
      cover: 'KW 31 · 28.07.',
      slides: [
        { title: 'Wochenüberblick', body: 'Vier Themenblöcke, zwei Entscheidungen offen.' },
        { title: 'Meta Ads', body: 'Set B pausiert. CPA 41 €. Nächster Schritt: Creative-Test.' },
      ],
      open: 'Testimonials – kein Input. Nachfrage gesammelt.',
    },
  },
  {
    slug: 'session-handoff',
    name: 'Session Handoff',
    tagline: 'Die nächste Session macht weiter, wo du aufgehört hast.',
    subheading:
      'status.md als Dashboard statt Tagebuch – Erledigtes fließt ins Log, Entscheidungen nur mit deinem OK.',
    bullets: [
      'Drei Dateien, die sich nie überschneiden: Stand, Historie, Entscheidungen',
      'Hartes Limit: status.md passt auf eine Bildschirmseite, sonst muss etwas raus',
      'Schreibt nichts in decisions.md, was du nicht vorher gelesen hast',
    ],
    status: 'stable',
    tag: 'Ops',
    downloadUrl: '/skills/session-handoff.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/session-handoff`,
    sampleOutput: `# Status — Projekt X
> Last updated: 2026-07-30

## Jetzt
- Landingpage steht, Formular hängt am DNS.

## Nächste Schritte
1. DNS-Eintrag prüfen (bei Hoster, seit Di offen)

## Blocker
- Freigabe Bildrechte fehlt

→ 6 erledigte Punkte nach log.md abgeflossen.`,
    problem:
      'Beim nächsten Öffnen ist der Kontext weg. Entweder steht nichts da, oder die Status-Datei ist über Monate zu einem Tagebuch angewachsen, das niemand mehr liest – und in dem der aktuelle Stand zwischen Erledigtem versteckt ist.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden. Bringt den /handoff-Command mit.' },
      { title: 'Am Sessionende auslösen', body: '"Handoff" sagen oder /handoff tippen, solange der Kontext des Gesprächs noch lebt.' },
      { title: 'Sauber übergeben', body: 'Erledigtes fließt ins log.md, status.md wird überschrieben, decisions.md nur nach deiner Freigabe. Zum Schluss zählt der Skill die Zeilen nach.' },
    ],
    whyBuilt:
      'Ich arbeite an mehreren Projekten parallel und selten zwei Tage am Stück am selben. Der teuerste Moment war immer der Wiedereinstieg. Drei Dateien mit klarer Aufgabenteilung lösen das – der Skill sorgt dafür, dass sie nicht wieder ineinanderlaufen.',
    builtFor: ['Claude Code (Skill + /handoff-Command)', 'Jedes Projekt mit Dateien, keine Datenbank nötig', 'Legt die Struktur auf Wunsch selbst an'],
    triggers: ['handoff', 'session ende', 'status.md', 'übergabe', 'weitermachen'],
    preview: {
      kind: 'pipeline',
      label: 'Handoff · Projekt X',
      steps: [
        { name: 'Session lesen', state: 'done' },
        { name: 'log.md', state: 'done' },
        { name: 'status.md', state: 'done' },
        { name: 'decisions.md', state: 'gate' },
      ],
      note: '6 erledigte Punkte abgeflossen · status.md: 34 Zeilen · 1 Entscheidung zur Freigabe.',
    },
  },
  {
    slug: 'fable-prompter',
    name: 'Fable Prompter',
    tagline: 'Aus der groben Idee ein Prompt, den du abschicken kannst. Ohne Lücken zum Ausfüllen.',
    subheading:
      'Optimiert für Claude Fable 5 in Chat und Cowork – Ziel statt Schrittfolge, Inhalt fest eingebaut.',
    bullets: [
      'Keine Platzhalter: kopieren, einfügen, abschicken',
      'Baut deinen Inhalt direkt ein, statt ihn zu einer Vorlage zu machen',
      'Setzt Grenzen, wo Eigeninitiative daneben gehen kann – besonders in Cowork',
    ],
    status: 'beta',
    tag: 'Prompting',
    downloadUrl: '/skills/fable-prompter.skill',
    githubUrl: `${GITHUB_REPO_URL}/tree/main/fable-prompter`,
    sampleOutput: `Vorher:
"Schritt 1: lies meine Notizen. Schritt 2: warte
auf Freigabe. Schritt 3: schreib einen Entwurf…"

Nachher:
"Mach aus meinen Notizen eine fertige Newsletter-
Ausgabe für Selbstständige, die am Handy überfliegen.
Fertig heißt: ~600 Wörter in meinem Ton, plus 5
Betreffzeilen, deine Empfehlung zuerst."`,
    problem:
      'Die Prompt-Gewohnheiten von 2024 schaden heute: durchnummerierte Schrittfolgen, Freigabe-Schleifen, "denk Schritt für Schritt". Neuere Modelle arbeiten besser mit einem klaren Ziel und einer Definition von "fertig".',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden.' },
      { title: 'Idee reinwerfen', body: 'Ein grober Entwurf, eine vage Aufgabe, ein Absatz Kontext – oder ein alter Prompt, der nicht mehr zieht.' },
      { title: 'Prompt kopieren', body: 'Ein einzelner Codeblock, fertig zum Abschicken. Kein Vorwort, keine Erklärung, keine eckigen Klammern.' },
    ],
    whyBuilt:
      'Ich habe zu viele Prompts gesehen, die aus lauter Vorsicht überstrukturiert waren – und dadurch schlechter liefen. Der Skill hält meine eigenen Prompts auf dem Stand des Modells, mit dem ich tatsächlich arbeite.',
    builtFor: ['Claude Fable 5 in Chat und Cowork', 'Nicht für die API – keine System-Prompts, keine Settings', 'Antwortet in der Sprache deiner Eingabe'],
    triggers: ['prompt schreiben', 'prompt optimieren', 'besserer prompt', 'cowork', 'fable 5'],
    preview: {
      kind: 'prompt',
      before: 'Schritt 1: lies meine Notizen. Schritt 2: warte auf Freigabe. Schritt 3: schreib einen Entwurf. Schritt 4: warte auf Freigabe…',
      after: 'Mach aus meinen Notizen eine fertige Newsletter-Ausgabe. Fertig heißt: ~600 Wörter in meinem Ton, plus 5 Betreffzeilen, deine Empfehlung zuerst.',
    },
  },
];
