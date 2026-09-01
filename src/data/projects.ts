export type ProjectAccent =
  | "purple"
  | "yellow"
  | "pink"
  | "mint"
  | "blue";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;

  year: string;
  status: "Building" | "Built" | "Concept";

  technologies: string[];

  accent: ProjectAccent;

  emoji: string;

  highlights: string[];

  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "aura-gaze",

    title: "Aura Gaze",

    subtitle: "Emotional AI Best Friend",

    description:
      "An AI-powered companion designed around meaningful conversations and emotional connection.",

    longDescription:
      "Aura Gaze is a personal AI companion experience focused on creating meaningful and natural conversations. The project explores emotional interaction, personality-driven responses and a warm user experience that feels more personal than a traditional chatbot.",

    year: "2025 — Present",

    status: "Building",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
    ],

    accent: "purple",

    emoji: "🤖",

    highlights: [
      "Personal AI companion experience",
      "Interactive onboarding flow",
      "Custom personality-driven conversations",
      "Emotion-focused UI and UX",
    ],
  },

  {
    id: "hiddenink",

    title: "HiddenInk",

    subtitle: "Story Publishing Platform",

    description:
      "A creative platform where writers can publish stories and readers can discover new imaginary worlds.",

    longDescription:
      "HiddenInk is a storytelling platform designed to make writing and discovering stories feel immersive and enjoyable. It focuses on clean reading experiences, creative publishing tools and a space where stories can find their audience.",

    year: "2026",

    status: "Built",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
    ],

    accent: "yellow",

    emoji: "📖",

    highlights: [
      "Story publishing experience",
      "Reader-friendly interface",
      "Creative content discovery",
      "Responsive user experience",
    ],
  },

  {
    id: "dore-dazzle",

    title: "Dore Dazzle",

    subtitle: "Cartoon Gaming Platform",

    description:
      "A playful browser gaming experience built around colorful visuals and interactive gameplay.",

    longDescription:
      "Dore Dazzle is a playful gaming project that combines colorful cartoon visuals with interactive browser-based gameplay. The goal is to create a fun digital experience where design and interaction feel equally important.",

    year: "2026 — Present",

    status: "Building",

    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "Node.js",
    ],

    accent: "pink",

    emoji: "🎮",

    highlights: [
      "Interactive browser gameplay",
      "Cartoon-inspired visual design",
      "Responsive interface",
      "Playful animations and interactions",
    ],
  },

  {
    id: "portfolio",

    title: "Jem's Universe",

    subtitle: "Interactive Developer Portfolio",

    description:
      "A cartoon-inspired portfolio that combines storytelling, motion and interactive experiences.",

    longDescription:
      "Jem's Universe is my personal corner of the internet. Instead of a traditional portfolio, it is designed like a playful digital world where visitors can explore my work, skills, creativity and eventually talk with my AI assistant, Luna.",

    year: "2026",

    status: "Building",

    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Three.js",
    ],

    accent: "mint",

    emoji: "🌌",

    highlights: [
      "Interactive scrolling experience",
      "Cartoon-inspired UI system",
      "Motion-based interactions",
      "Future AI assistant integration",
    ],
  },

  {
    id: "creative-lab",

    title: "Creative Lab",

    subtitle: "Experiments & Tiny Ideas",

    description:
      "A collection of small experiments where I explore animation, interaction and creative coding.",

    longDescription:
      "Creative Lab is a space for experiments, unfinished ideas and small interactive projects. It allows me to explore new technologies and turn random creative thoughts into working digital experiences.",

    year: "2026",

    status: "Concept",

    technologies: [
      "React",
      "CSS",
      "JavaScript",
      "Framer Motion",
    ],

    accent: "blue",

    emoji: "✨",

    highlights: [
      "Creative coding experiments",
      "Animation explorations",
      "Interactive UI concepts",
      "Small experimental projects",
    ],
  },
];