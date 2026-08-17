import { technicalSkills } from "../../data/skills";
import SectionLabel from "../common/SectionLabel";

export default function TechStack() {
  return (
    <section id="skills" className="px-6 py-28 lg:px-12">
      <SectionLabel number="02">My Toolbox</SectionLabel>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-5xl md:text-6xl">
            Things I use to
            <span className="text-[#ef806d]"> build.</span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {technicalSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-sm border-2 border-[#19171c]/10 bg-[#faf5eb] px-4 py-3 font-mono text-xs paper-shadow-soft transition hover:-translate-y-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="rotate-[1deg] border-2 border-[#19171c]/15 bg-[#f4d35e] p-7 paper-shadow">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em]">
            Currently learning
          </div>

          <h3 className="mt-5 font-display text-4xl">Always growing.</h3>

          <ul className="mt-7 space-y-4">
            {[
              "Advanced TypeScript",
              "Three.js",
              "Blender",
              "AI / LLMs",
              "Docker",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-[#19171c]/15 pb-3 font-mono text-xs"
              >
                <span>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}