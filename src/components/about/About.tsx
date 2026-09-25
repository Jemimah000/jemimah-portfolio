import { Camera, Gamepad2, Pencil } from "lucide-react";
import { about } from "../../data/about";
import SectionLabel from "../common/SectionLabel";

const creativeInterests = [
  {
    name: "Sketching",
    icon: Pencil,
  },
  {
    name: "Photography",
    icon: Camera,
    link: "https://www.instagram.com/dreamye_frames/",
  },
  {
    name: "Game Design",
    icon: Gamepad2,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-28 lg:px-12"
    >
      <SectionLabel number="01">Who I Am</SectionLabel>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left side */}
        <div className="relative">
          <div className="mb-5 font-hand text-3xl text-[#8c70d0]">
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

        {/* Right side */}
        <div>
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            A developer with a
            <span className="text-[#8c70d0]"> creative heart.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#19171c]/65">
            {about.description}
          </p>

          {/* Traits */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.traits.map((trait) => (
              <div
                key={trait}
                className="flex items-center gap-3 border-b border-[#19171c]/10 py-3"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#8c70d0]" />

                <span className="font-mono text-xs">{trait}</span>
              </div>
            ))}
          </div>

          {/* Beyond the code */}
          <div className="mt-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#19171c]/40">
              Beyond the code
            </p>

            <div className="flex flex-wrap gap-2">
              {creativeInterests.map((interest) => {
                const Icon = interest.icon;

                if (interest.link) {
                  return (
                    <a
                      key={interest.name}
                      href={interest.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-[#19171c]/15 bg-[#faf5eb] px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8c70d0]/40 hover:bg-white hover:shadow-sm"
                    >
                      <Icon size={14} />
                      {interest.name}
                    </a>
                  );
                }

                return (
                  <span
                    key={interest.name}
                    className="flex items-center gap-2 rounded-full border border-[#19171c]/15 bg-[#faf5eb] px-4 py-2 text-sm"
                  >
                    <Icon size={14} />
                    {interest.name}
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