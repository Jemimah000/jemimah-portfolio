import { useEffect } from "react";

import {
  Code2,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import type { Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const accentStyles = {
  purple: "from-[#cdbdff] via-[#e8e0ff] to-[#faf7ff]",

  yellow: "from-[#ffd166] via-[#ffe9a8] to-[#fff9e8]",

  pink: "from-[#ff9d9d] via-[#ffd4d4] to-[#fff6f6]",

  mint: "from-[#6ed3cf] via-[#cef6f3] to-[#f5ffff]",

  blue: "from-[#8bb8ff] via-[#dce9ff] to-[#f7faff]",
};

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#1d1b35]/60 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border-2 border-[#1d1b35] bg-[#fffdf8] shadow-[12px_12px_0_#1d1b35]"
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-white transition hover:rotate-90 hover:bg-[#1d1b35] hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div
              className={`relative overflow-hidden bg-gradient-to-br px-7 pb-10 pt-12 sm:px-12 sm:pb-12 ${
                accentStyles[project.accent]
              }`}
            >
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border-2 border-white/50" />

              <div className="absolute -bottom-16 right-10 h-44 w-44 rounded-full border-2 border-[#1d1b35]/10" />

              <Sparkles
                className="absolute left-8 top-7 text-[#1d1b35]/40"
                size={22}
              />

              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                <motion.div
                  animate={{
                    rotate: [-4, 4, -4],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[32px] border-2 border-white/60 bg-white/30 text-6xl shadow-[0_10px_30px_rgba(29,27,53,0.12)] backdrop-blur-sm"
                >
                  {project.emoji}
                </motion.div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1d1b35]/50">
                    {project.year}
                  </span>

                  <h2
                    id="project-title"
                    className="mt-2 font-display text-5xl leading-none sm:text-6xl"
                  >
                    {project.title}
                  </h2>

                  <p className="mt-3 font-hand text-3xl text-[#6042bf]">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 sm:p-12">
              <p className="max-w-2xl text-base leading-8 text-[#37334f]/75">
                {project.longDescription}
              </p>

              {/* Highlights */}
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1d1b35]/45">
                  What I explored
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 rounded-2xl border border-[#1d1b35]/10 bg-[#1d1b35]/[0.03] p-4"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7c5ce7] font-mono text-[10px] text-white">
                        {index + 1}
                      </span>

                      <span className="text-sm leading-6 text-[#37334f]/75">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1d1b35]/45">
                  Built with
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border-2 border-[#1d1b35]/10 bg-white px-4 py-2 font-mono text-[10px]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="jem-button bg-[#7c5ce7] text-white"
                    >
                      Live Project

                      <ExternalLink className="ml-2" size={15} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="jem-button bg-white"
                    >
                      View Code

                      <Code2 className="ml-2" size={15} />
                    </a>
                  )}
                </div>
              )}

              {/* Bottom */}
              <div className="mt-12 flex items-center justify-between border-t border-[#1d1b35]/10 pt-6">
                <span className="font-hand text-xl text-[#7c5ce7]">
                  Made with curiosity ✦
                </span>

                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#1d1b35]/50 transition hover:text-[#1d1b35]"
                >
                  Close project
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}