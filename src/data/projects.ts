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

    subtitle: "AI Best Friend Platform",

    description:
      "A full-stack AI companion platform built around meaningful conversations and emotional connection.",

    longDescription:
      "Aura Gaze is a full-stack AI companion platform that focuses on creating meaningful and natural conversations. I built the application using the MERN stack, with a responsive React frontend and a Node.js and Express backend connected to MongoDB. The project also includes secure authentication and an interactive user experience designed around personal AI conversations.",

    year: "2026 — Ongoing",

    status: "Building",

    technologies: [
      "React",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],

    accent: "purple",

    emoji: "🤖",

    highlights: [
      "Full-stack AI companion platform",
      "Responsive React user interface",
      "JWT authentication",
      "Node.js and Express backend",
      "MongoDB database integration",
    ],

    liveUrl: "https://auragaze1528.netlify.app/",
  },

  {
    id: "hiddenink",

    title: "HiddenInk",

    subtitle: "Story Publishing & Reading Platform",

    description:
      "A responsive frontend platform for publishing stories and discovering new imaginary worlds.",

    longDescription:
      "HiddenInk is a frontend story publishing and reading platform designed to make discovering and reading stories simple and enjoyable. I built the responsive interface using React and TypeScript and used TanStack Query for handling and optimizing API data fetching. The project focuses on reusable UI components and a clean reading experience.",

    year: "2025",

    status: "Built",

    technologies: [
      "React",
      "TypeScript",
      "TanStack Query",
    ],

    accent: "yellow",

    emoji: "📖",

    highlights: [
      "Responsive story publishing interface",
      "React and TypeScript frontend",
      "TanStack Query for data fetching",
      "Reusable UI components",
      "Reader-friendly experience",
    ],

    liveUrl: "https://hiddenink.netlify.app/",
  },

  {
    id: "dore-dazzle",

    title: "Dore Dazzle",

    subtitle: "Cartoon-Themed Browser Gaming Platform",

    description:
      "A playful browser gaming experience built with colorful cartoon visuals and interactive gameplay.",

    longDescription:
      "Dore Dazzle is a cartoon-themed browser gaming project built to create a fun and interactive web experience. I developed the platform using React and JavaScript, focusing on responsive layouts, modular components and a colorful visual style inspired by cartoon gaming experiences.",

    year: "2026 — Ongoing",

    status: "Building",

    technologies: [
      "React",
      "JavaScript",
    ],

    accent: "pink",

    emoji: "🎮",

    highlights: [
      "Browser-based gaming experience",
      "React and JavaScript",
      "Responsive layouts",
      "Modular components",
      "Cartoon-inspired visual design",
    ],

    liveUrl: "https://dore-dazzle.vercel.app/",
  },
];