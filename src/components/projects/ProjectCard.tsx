import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import type { Project } from "../../data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  onClick: () => void;
};

const accentStyles = {
  purple:
    "from-[#cdbdff] via-[#e6ddff] to-[#f7f3ff]",

  yellow:
    "from-[#ffd166] via-[#ffe9a8] to-[#fff9e7]",

  pink:
    "from-[#ff9d9d] via-[#ffd1d1] to-[#fff4f4]",

  mint:
    "from-[#6ed3cf] via-[#c8f4f1] to-[#f2fffe]",

  blue:
    "from-[#8bb8ff] via-[#d5e5ff] to-[#f5f9ff]",
};

const statusStyles = {
  Building:
    "bg-[#eee8ff] text-[#6042bf] border-[#7c5ce7]/30",

  Built:
    "bg-[#e2f8e7] text-[#26733a] border-[#48a95c]/30",

  Concept:
    "bg-[#fff0c9] text-[#8a6200] border-[#d7a11d]/30",
};

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
        rotate: index % 2 === 0 ? -1 : 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: index % 2 === 0 ? -1 : 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
        rotate: 0,
      }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[26px] border-2 border-[#1d1b35]/15 bg-white/90 shadow-[5px_6px_0_rgba(29,27,53,0.12)] transition-shadow hover:shadow-[9px_10px_0_#1d1b35]"
    >
      {/* Decorative tape */}

      <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 -translate-y-2 rotate-[-2deg] bg-white/40 backdrop-blur-sm" />

      {/* Image / illustration area */}

      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${accentStyles[project.accent]}`}
      >
        {/* Decorative circles */}

        <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full border-2 border-white/40" />

        <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full border-2 border-[#1d1b35]/10" />

        {/* Sparkles */}

        <Sparkles
          size={22}
          className="absolute left-6 top-6 text-[#1d1b35]/40"
        />

        <span className="absolute right-7 top-6 text-xl">
          ✦
        </span>

        {/* Main emoji */}

        <motion.div
          animate={{
            y: [0, -7, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[32px] border-2 border-white/60 bg-white/25 text-6xl shadow-[0_12px_25px_rgba(29,27,53,0.12)] backdrop-blur-sm"
        >
          {project.emoji}
        </motion.div>

        {/* Project number */}

        <span className="absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.2em] text-[#1d1b35]/40">
          PROJECT {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Top information */}

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#1d1b35]/45">
            {project.year}
          </span>

          <span
            className={`rounded-full border px-3 py-1 font-mono text-[9px] ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}

        <h3 className="mt-5 font-display text-3xl leading-none text-[#1d1b35]">
          {project.title}
        </h3>

        {/* Subtitle */}

        <p className="mt-2 font-hand text-2xl text-[#7c5ce7]">
          {project.subtitle}
        </p>

        {/* Description */}

        <p className="mt-4 text-sm leading-6 text-[#37334f]/70">
          {project.description}
        </p>

        {/* Technologies */}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[#1d1b35]/10 bg-[#1d1b35]/5 px-3 py-1 font-mono text-[9px] text-[#37334f]/70"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Explore button */}

        <div className="mt-7 flex items-center justify-between border-t border-[#1d1b35]/10 pt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1d1b35]/45">
            Click to explore
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#1d1b35] group-hover:text-white">
            <ArrowUpRight size={17} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}