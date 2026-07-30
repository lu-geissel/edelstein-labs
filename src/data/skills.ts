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
    tagline: 'Schreib mit AI in deiner eigenen Stimme – erkennbar, in jedem Chat.',
    subheading:
      'Aus deinen echten Texten wird ein VOICE.md. Jede AI liest es vor dem Schreiben und klingt danach nach dir.',
    bullets: [
      'Deine Texte klingen nach dir – erkennbar, in jedem Chat und in jedem Tool',
      'Schluss mit AI-Slop: die verräterischen Floskeln stehen auf einer Bannliste',
      'Einmal erstellt, überall gelesen – du erklärst deinen Stil nie wieder im Prompt',
      'Wird mit jeder Korrektur besser, statt bei jedem neuen Chat bei null anzufangen',
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
      'AI-Texte klingen nach AI. Immer dieselben Floskeln, derselbe Rhythmus, dieselben Dreiklänge – Leser merken das inzwischen. Und du tippst in jedem neuen Chat aufs Neue "schreib in meinem Stil", ohne je gesagt zu haben, was das eigentlich heißt. Das Ergebnis: Texte, die du vor dem Absenden ohnehin umschreibst.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden (siehe unten).' },
      { title: 'Texte geben', body: 'Mindestens 3, ideal 10+ Texte, die du selbst geschrieben hast – Mails, Posts, Angebote. Gemischte Formate sind besser als ein einziges. Der Skill analysiert Rhythmus, Wortschatz, Eigenheiten und deine No-Gos, jeweils mit Belegzitat aus deinem Material.' },
      { title: 'VOICE.md bekommen und benutzen', body: 'Der Skill schreibt eine Probe in deiner Stimme und stellt sie neben deine Originale – du siehst sofort, ob es sitzt. Danach liegt das Profil als eine Datei in deinem Projekt: Jede AI, die sie liest, schreibt ab da wie du.' },
    ],
    whyBuilt:
      'Ich schreibe für mehrere Marken plus mich selbst. Prompt-Imitation driftet – ein geschriebenes Profil nicht. Es ist überprüfbar, versionierbar, und jede Korrektur, die du machst, wandert zurück hinein. Nach drei Runden schreibt die AI Entwürfe, an denen du nichts mehr glattziehst.',
    builtFor: ['Jedes LLM – Claude, ChatGPT, Gemini & Co.', 'Eine einzige Datei, die überall gelesen wird', 'Greift direkt in LinkedIn Content Creation'],
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
    slug: 'linkedin-content-creation',
    name: 'LinkedIn Content Creation',
    tagline: 'Die Sprachnotiz von heute Morgen wird ein Post, den du unterschreiben kannst.',
    subheading:
      'Erst der Winkel, dann der Text – und dazwischen entscheidest du. Hook zuerst, jede Zahl markiert, Edit-Pass mit frischem Blick.',
    bullets: [
      'Dein Rohmaterial wird verwertet, statt liegen zu bleiben: Sprachnotiz, Video, PDF, Link',
      'Du entscheidest zweimal – nichts läuft ohne dein Wort durch bis zum fertigen Text',
      'Keine erfundenen Belege: jede Zahl im Draft trägt einen Faktencheck-Marker',
      'Kein Recycling deiner eigenen Formulierungen – jeder Post bekommt eigene Textur',
    ],
    status: 'stable',
    tag: 'Content',
    downloadUrl: '/skills/linkedin-post.skill',
    extraDownloads: [{ label: 'linkedin-draft.skill', url: '/skills/linkedin-draft.skill' }],
    githubUrl: `${GITHUB_REPO_URL}/tree/main/linkedin-content-creation`,
    sampleOutput: `HOOKS (6 Kandidaten, ★ = Empfehlung)

★ 2 · [Zahl] "Drei Wochen Ausschreibung. Und dann
  entscheidet der Preis."
  3 · [Szene] "Der Techniker stand um 6:40 vor
  einer verschlossenen Tür."

[FAKTENCHECK: 3 Wochen – mit Klient bestätigen]`,
    problem:
      'Der Rohstoff für gute Posts liegt längst da: in Sprachnotizen, Calls, PDFs. Was daraus wird, ist meistens generisch oder eine Woche zu spät. Und lässt man die AI einfach durchlaufen, steht am Ende ein Text, den so niemand freigegeben hätte – mit Zahlen, die niemand geprüft hat.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden. Enthält zwei Skills: den Ablauf und die Schreib-Engine.' },
      { title: 'Material reinwerfen', body: 'Sprachnotiz, Video, PDF, Link oder eine grobe Idee. Audio wird lokal transkribiert. Beim ersten Lauf richtet der Skill deinen linkedin/-Ordner gemeinsam mit dir ein.' },
      { title: 'Zweimal entscheiden', body: 'Erst der Winkel, dann der Draft. An beiden Stellen stoppt der Skill und wartet auf dein Wort – du schärfst nach oder gibst frei. Deine Endfassung wird als eigene Version abgelegt: der Unterschied zwischen Entwurf und Endtext ist das, woraus der nächste Post lernt.' },
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
    tagline: 'Die Stunde Meeting-Vorbereitung, die jede Woche wiederkommt – erledigt, bevor du dich hinsetzt.',
    subheading:
      'Zieht deine Quellen, gleicht die Vorwoche gegen das Ist ab und baut das Deck – erst nach deiner Freigabe.',
    bullets: [
      'Du gehst vorbereitet rein: kein Zusammensuchen von Stunden, Tasks und letztem Deck mehr',
      'Findet die Lücke vor dem Termin – jede Priorität ohne Fortschritt wird dir vorher zur Frage gestellt',
      'Läuft mit deinen eigenen Quellen: Zeiterfassung, letztes Deck, Task-Board, mündliche Updates',
      'Deck in deinem Format: Gamma, Markdown, Slide-Text oder Dokument',
    ],
    status: 'stable',
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
      'Das wiederkehrende Meeting frisst jede Woche dieselbe Stunde: Quellen zusammensuchen, sich erinnern, was letzte Woche versprochen war, Slides bauen. Und der eine Punkt, zu dem es nichts zu berichten gibt, fällt dir erst im Termin auf – vor dem Kunden.',
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
    tagline: 'Gib deiner AI ein Gedächtnis: Was passiert ist, wo du stehst, warum du es so entschieden hast.',
    subheading:
      'Ab jetzt wird mitgeschrieben. Jede Session endet mit einem Stand, den die nächste liest – über /clear, Modellwechsel und Wochen Pause hinweg.',
    bullets: [
      'Kein Wiedereinstieg aus dem Nichts mehr: die nächste Session weiß, wo ihr wart',
      'Deine Entscheidungen und ihre Begründung überleben jedes /clear und jeden Modellwechsel',
      'Der Stand bleibt lesbar: ein Dashboard auf einer Bildschirmseite, kein zugewuchertes Tagebuch',
      'Kein Dienst, keine Datenbank, kein Abo – drei Markdown-Dateien in deinem eigenen Projekt',
    ],
    status: 'stable',
    tag: 'Memory',
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
      'AI-Sessions vergessen alles. Beim nächsten Öffnen erklärst du dein Projekt wieder von vorn – oder schlimmer: die AI trifft eine Entscheidung neu, die du vor drei Wochen schon getroffen und begründet hattest. Und wo mitgeschrieben wird, wächst die Status-Datei in Monaten zu einem Tagebuch, in dem der aktuelle Stand zwischen Erledigtem verschwindet.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden. Bringt den /handoff-Command mit.' },
      { title: 'Am Sessionende auslösen', body: '"Handoff" sagen oder /handoff tippen, solange der Kontext des Gesprächs noch lebt. Existiert die Struktur noch nicht, legt der Skill sie mit dir gemeinsam an.' },
      { title: 'Ab jetzt hat dein Projekt ein Gedächtnis', body: 'Drei Dateien, die sich nie überschneiden: status.md sagt, wo du stehst. log.md, was passiert ist. decisions.md, warum du es so entschieden hast – und da schreibt der Skill nichts hinein, was du nicht vorher gelesen und freigegeben hast. Die nächste Session liest das und macht weiter.' },
    ],
    whyBuilt:
      'Ich arbeite an mehreren Projekten parallel und selten zwei Tage am Stück am selben. Der teuerste Moment war immer der Wiedereinstieg – und die Fälle, in denen eine frische Session eine längst getroffene Entscheidung aufrollte, weil ihre Begründung nirgends stand. Dateien lösen das: sie überleben jeden Kontext-Reset und du kannst sie lesen, ohne ein Tool zu starten.',
    builtFor: ['Claude Code (Skill + /handoff-Command)', 'Jedes Projekt mit Dateien – kein Dienst, keine Datenbank', 'Legt die Struktur auf Wunsch selbst an'],
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
    tagline: 'Denk mit Opus, arbeite mit Fable: ein Prompt, der präzise sitzt und Tokens spart.',
    subheading:
      'Lass Opus 5 aus deiner groben Idee den Prompt bauen und schick ihn in Fable 5 ab – die Rechenarbeit landet dort, wo sie hingehört.',
    bullets: [
      'Spart Tokens und Runden: die Idee steht so präzise drin, dass Fable nicht raten und nachfragen muss',
      'Nutzt aus, was Fable 5 anders macht – Ziel statt Schrittfolge, Initiative mit klaren Grenzen',
      'Fertig zum Abschicken: kein Ausfüllfeld, keine eckigen Klammern, kein Nachbessern',
      'Setzt Leitplanken, wo Eigeninitiative teuer wird – besonders in Cowork mit echten Dateien',
    ],
    status: 'stable',
    tag: 'Prompting',
    note: 'Führ diesen Skill mit Opus 5 aus, nicht mit Fable 5. Opus baut den Prompt, Fable arbeitet ihn ab. Andersherum lässt du das teure Nachdenken vom Modell erledigen, das eigentlich nur ausführen sollte – und zahlst es in Tokens.',
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
      'Ein vager Prompt kostet dich zwei Dinge: Runden und Tokens. Fable fragt nach, rät falsch, du korrigierst, es rechnet erneut. Dazu kommen die Prompt-Gewohnheiten von 2024, die heute aktiv schaden – durchnummerierte Schrittfolgen, Freigabe-Schleifen, "denk Schritt für Schritt". Sie machen das Ergebnis schlechter, nicht besser.',
    howItWorks: [
      { title: 'Installieren', body: 'Skill herunterladen und in deinem AI-Assistenten einbinden.' },
      { title: 'Den Prompt von Opus 5 bauen lassen', body: 'Führ diesen Skill mit Opus 5 aus, nicht mit Fable. Wirf eine grobe Idee rein, einen vagen Auftrag, einen Absatz Kontext – oder einen alten Prompt, der nicht mehr zieht. Opus denkt die Aufgabe durch und formuliert sie präzise aus.' },
      { title: 'Prompt in Fable 5 abschicken', body: 'Ein einzelner Codeblock, fertig zum Kopieren – kein Vorwort, keine eckigen Klammern. Die Denkarbeit ist dann schon erledigt, Fable führt nur noch aus. Genau so nutzt du dein Token-Budget sinnvoll.' },
    ],
    whyBuilt:
      'Ich habe zu viele Prompts gesehen, die aus lauter Vorsicht überstrukturiert waren und dadurch schlechter liefen. Und ich habe zu oft zugesehen, wie ein starkes Modell erst mal rät, was ich eigentlich will. Beides kostet Geld. Der Skill trennt die zwei Arbeiten sauber: Opus denkt, Fable macht.',
    builtFor: ['Erstellen mit Opus 5 · Ausführen in Fable 5', 'Chat und Cowork – nicht für die API', 'Antwortet in der Sprache deiner Eingabe'],
    triggers: ['prompt schreiben', 'prompt optimieren', 'tokens sparen', 'cowork', 'fable 5'],
    preview: {
      kind: 'prompt',
      before: 'Schritt 1: lies meine Notizen. Schritt 2: warte auf Freigabe. Schritt 3: schreib einen Entwurf. Schritt 4: warte auf Freigabe…',
      after: 'Mach aus meinen Notizen eine fertige Newsletter-Ausgabe. Fertig heißt: ~600 Wörter in meinem Ton, plus 5 Betreffzeilen, deine Empfehlung zuerst.',
    },
  },
];
