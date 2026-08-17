export type Project = {
  title: string;
  subtitle: string;
  description: string;
  year: string;
  status: string;
  technologies: string[];
  accent: "violet" | "yellow" | "coral";
  emoji: string;
};

export const projects: Project[] = [
  {
    title: "Aura Gaze",
    subtitle: "Emotional AI Best Friend",
    description:
      "An AI-powered experience designed around meaningful conversations and emotional connection.",
    year: "2025 — Present",
    status: "Building",
    technologies: ["React", "Node.js", "MongoDB"],
    accent: "violet",
    emoji: "✦",
  },
  {
    title: "HiddenInk",
    subtitle: "Story Publishing Platform",
    description:
      "A storytelling platform where writers can publish, discover and experience stories in a beautiful environment.",
    year: "2026",
    status: "Built",
    technologies: ["TypeScript", "React", "Tailwind"],
    accent: "yellow",
    emoji: "✎",
  },
  {
    title: "Dore Dazzle",
    subtitle: "Cartoon Gaming Platform",
    description:
      "A playful browser gaming experience featuring a cartoon-inspired memory matching game.",
    year: "2026 — Present",
    status: "Building",
    technologies: ["React", "JavaScript", "CSS"],
    accent: "coral",
    emoji: "🎮",
  },
];