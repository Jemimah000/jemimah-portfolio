import { Camera, Gamepad2, Music2, Pencil, PenLine } from "lucide-react";
import SectionLabel from "../common/SectionLabel";

const creativeThings = [
  {
    title: "Sketch",
    description: "Pencils, paper and ideas.",
    icon: Pencil,
    rotate: "-rotate-2",
    accent: "bg-[#f4d35e]",
  },
  {
    title: "Capture",
    description: "Little moments through photography.",
    icon: Camera,
    rotate: "rotate-1",
    accent: "bg-[#e7ddfa]",
  },
  {
    title: "Play",
    description: "Games, cartoons and interactive worlds.",
    icon: Gamepad2,
    rotate: "-rotate-1",
    accent: "bg-[#f5b0a3]",
  },
  {
    title: "Express",
    description: "Music, dance and random creative energy.",
    icon: Music2,
    rotate: "rotate-2",
    accent: "bg-[#e7ddfa]",
  },
  {
    title: "Write",
    description: "Stories, thoughts and imaginary worlds.",
    icon: PenLine,
    rotate: "-rotate-2",
    accent: "bg-[#f4d35e]",
  },
];

export default function CreativeCorner() {
  return (
    <section id="creative" className="px-6 py-28 lg:px-12">
      <SectionLabel number="03">Beyond Code</SectionLabel>

      <div className="mb-12 max-w-3xl">
        <h2 className="font-display text-5xl md:text-6xl">
          The things that make me
          <span className="text-[#8c70d0]"> me.</span>
        </h2>

        <p className="mt-5 text-base leading-8 text-[#19171c]/60">
          Code is only one part of my creative world.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {creativeThings.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`border-2 border-[#19171c]/15 p-6 ${item.accent} ${item.rotate} paper-shadow-soft transition hover:rotate-0 hover:-translate-y-2`}
            >
              <Icon size={26} />

              <h3 className="mt-12 font-display text-3xl">
                {item.title}
              </h3>

              <p className="mt-2 font-mono text-[10px] leading-5 text-[#19171c]/60">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}