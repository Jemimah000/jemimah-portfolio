import { Camera, Gamepad2, Heart, Pencil, Sparkles } from "lucide-react";
import { about } from "../../data/about";
import SectionLabel from "../common/SectionLabel";
import Doodle from "../common/Doodle";

const icons = [Pencil, Camera, Gamepad2, Sparkles, Heart, Pencil];

export default function About() {
  return (
    <section id="about" className="px-6 py-28 lg:px-12">
      <SectionLabel number="01">Who I Am</SectionLabel>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="absolute -left-4 -top-5 font-hand text-3xl text-[#8c70d0]">
            a little about me...
          </div>

          <div className="rotate-[-1deg] border-2 border-[#19171c]/15 bg-[#faf5eb] p-8 paper-shadow">
            <div className="mb-8 flex h-56 items-center justify-center bg-[#e8dfd1]">
              <span className="font-hand text-5xl text-[#19171c]/25">
                your photo / sketch here
              </span>
            </div>

            <p className="font-hand text-2xl leading-8">
              "I like turning little ideas into things people can actually
              experience."
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            A developer with a
            <span className="text-[#8c70d0]"> creative heart.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#19171c]/65">
            {about.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.traits.map((trait, index) => (
              <div
                key={trait}
                className="flex items-center gap-3 border-b border-[#19171c]/10 py-3"
              >
                <Doodle type={index % 2 ? "spark" : "star"} />
                <span className="font-mono text-xs">{trait}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#19171c]/40">
              Beyond the code
            </p>

            <div className="flex flex-wrap gap-2">
              {about.creativeInterests.map((interest, index) => {
                const Icon = icons[index % icons.length];

                return (
                  <span
                    key={interest}
                    className="flex items-center gap-2 rounded-full border border-[#19171c]/15 bg-[#faf5eb] px-4 py-2 text-sm"
                  >
                    <Icon size={14} />
                    {interest}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}