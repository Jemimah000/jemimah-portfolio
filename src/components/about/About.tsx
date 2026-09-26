import { Camera, Gamepad2, Pencil, Sparkles } from "lucide-react";
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
      className="relative overflow-hidden bg-[#fff7e8] px-6 py-28 lg:px-12"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-[#8c70d0]/10 blur-3xl" />

      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#ffd166]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel number="01">Who I Am</SectionLabel>

        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* =========================
              LEFT SIDE - IMAGE
          ========================== */}
          <div className="relative">
            <div className="mb-5 flex items-center gap-2 font-hand text-3xl text-[#8c70d0]">
              <span>a little about me...</span>

              <Sparkles
                size={20}
                className="rotate-12 text-[#ffd166]"
              />
            </div>

            {/* Main paper card */}
            <div className="relative rotate-[-1deg] border-2 border-[#19171c]/15 bg-[#faf5eb] p-4 shadow-[7px_7px_0_rgba(29,27,53,0.12)] transition-transform duration-300 hover:rotate-0">
              {/* Tape decoration */}
              <div className="absolute -top-4 left-1/2 z-10 h-9 w-28 -translate-x-1/2 rotate-[-2deg] bg-[#ffd166]/70 shadow-sm" />

              {/* Image */}
              <div className="relative overflow-hidden border border-[#19171c]/10 bg-[#e8dfd1]">
                <img
                  src="/images/profile/sketch_&_photography.png"
                  alt="My sketching and photography work"
                  className="block h-auto w-full object-cover transition duration-700 hover:scale-[1.03]"
                />

                {/* Small image label */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-[#19171c]/75 px-3 py-1.5 backdrop-blur-sm">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white">
                    Sketches × Photography
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="px-3 pb-2 pt-6">
                <p className="font-hand text-2xl leading-8 text-[#19171c]">
                  "I like turning little ideas into things people can actually
                  experience."
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-[#8c70d0]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#19171c]/40">
                    a little piece of me
                  </span>
                </div>
              </div>
            </div>

            {/* Floating decorative note */}
            <div className="absolute -bottom-7 -right-3 rotate-[4deg] border border-[#19171c]/10 bg-[#ffd166] px-4 py-3 shadow-[3px_3px_0_rgba(29,27,53,0.15)]">
              <span className="font-hand text-lg text-[#19171c]">
                stay curious ✦
              </span>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE - CONTENT
          ========================== */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#19171c]/40">
              Developer · Creator · Learner
            </p>

            <h2 className="font-display text-5xl leading-[1.05] md:text-6xl">
              A developer with a
              <span className="text-[#8c70d0]"> creative heart.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#19171c]/65">
              {about.description}
            </p>

            {/* Traits */}
            <div className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {about.traits.map((trait) => (
                <div
                  key={trait}
                  className="group flex items-center gap-3 border-b border-[#19171c]/10 py-3 transition-colors duration-200 hover:border-[#8c70d0]/40"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8c70d0]/10 transition-transform duration-200 group-hover:scale-110">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8c70d0]" />
                  </span>

                  <span className="font-mono text-xs text-[#19171c]/75">
                    {trait}
                  </span>
                </div>
              ))}
            </div>

            {/* Beyond the code */}
            <div className="mt-10">
              <div className="mb-4 flex items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#19171c]/40">
                  Beyond the code
                </p>

                <div className="h-px w-12 bg-[#19171c]/10" />
              </div>

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
                        className="group flex items-center gap-2 rounded-full border border-[#19171c]/15 bg-[#faf5eb] px-4 py-2.5 text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#8c70d0]/40 hover:bg-white hover:shadow-md"
                      >
                        <Icon
                          size={15}
                          className="transition-transform duration-200 group-hover:rotate-[-8deg]"
                        />

                        {interest.name}

                        <span className="text-xs text-[#8c70d0]">
                          ↗
                        </span>
                      </a>
                    );
                  }

                  return (
                    <span
                      key={interest.name}
                      className="flex items-center gap-2 rounded-full border border-[#19171c]/15 bg-[#faf5eb] px-4 py-2.5 text-sm shadow-sm"
                    >
                      <Icon size={15} />

                      {interest.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Small personal note */}
            <div className="mt-10 border-l-2 border-[#8c70d0]/40 pl-5">
              <p className="font-hand text-xl leading-7 text-[#19171c]/70">
                Always learning something new, building something small,
                and finding ways to make technology a little more creative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}