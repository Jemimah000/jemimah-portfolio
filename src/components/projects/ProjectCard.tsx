import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../data/projects";

type ProjectCardProps = {
  project: Project;
};

const accentStyles = {
  violet: "bg-[#e7ddfa]",
  yellow: "bg-[#f4d35e]",
  coral: "bg-[#f5b0a3]",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-sm border-2 border-[#19171c]/15 bg-[#faf5eb] paper-shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-[7px_7px_0_#19171c]">
      <div
        className={`flex h-44 items-center justify-center ${accentStyles[project.accent]}`}
      >
        <span className="font-display text-7xl text-[#19171c]/75 transition-transform duration-300 group-hover:scale-110">
          {project.emoji}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#19171c]/40">
            {project.year}
          </span>

          <span className="rounded-full border border-[#19171c]/20 px-2 py-1 font-mono text-[9px]">
            {project.status}
          </span>
        </div>

        <h3 className="font-display text-3xl">{project.title}</h3>

        <p className="mt-1 font-hand text-xl text-[#7c65b5]">
          {project.subtitle}
        </p>

        <p className="mt-4 text-sm leading-6 text-[#19171c]/60">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-[#19171c]/5 px-3 py-1 font-mono text-[9px]"
            >
              {technology}
            </span>
          ))}
        </div>

        <button className="mt-6 flex items-center gap-2 font-mono text-xs font-medium">
          Explore project
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}