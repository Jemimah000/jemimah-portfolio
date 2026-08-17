import { ArrowDown, ArrowUpRight } from "lucide-react";
import Button from "../common/Button";
import Doodle from "../common/Doodle";
import CharacterScene from "./CharacterScene";
import { about } from "../../data/about";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6 pb-20 pt-10 lg:px-12"
    >
      <div className="absolute right-10 top-16 font-mono text-[10px] text-[#19171c]/40">
        EST. 2006
      </div>

      <Doodle className="absolute left-[8%] top-24 text-3xl" />
      <Doodle
        type="heart"
        className="absolute right-[7%] top-[38%] text-4xl text-[#ef806d]"
      />

      <div className="grid min-h-[85vh] items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex rotate-[-2deg] items-center gap-2 border-2 border-[#19171c] bg-[#f4d35e] px-4 py-2 font-mono text-xs paper-shadow-soft">
            <span>✦</span>
            SOFTWARE PRODUCT ENGINEER
          </div>

          <p className="font-hand text-2xl text-[#7c65b5]">
            Hi there! I'm
          </p>

          <h1 className="mt-1 font-display text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.06em]">
            Jemimah
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-hand text-4xl text-[#8c70d0]">
              Mary Manuel
            </span>

            <Doodle type="heart" className="text-3xl" />
          </div>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#19171c]/65">
            {about.shortIntro}
          </p>

          <p className="mt-4 max-w-lg font-mono text-xs leading-6 text-[#19171c]/45">
            Curious mind. Creative hands. Always building something.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#projects">
              <Button variant="yellow">
                Explore My Work <ArrowUpRight className="ml-2 inline" size={16} />
              </Button>
            </a>

            <a href="#contact">
              <Button variant="outline">
                Let's Connect <ArrowUpRight className="ml-2 inline" size={16} />
              </Button>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#19171c]/40">
            <ArrowDown size={14} />
            Scroll to explore
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-8 rounded-full bg-[#9b7ede]/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[30px] border-2 border-[#19171c]/10 bg-[#eee5d7]/60">
            <div className="absolute left-5 top-5 z-10 rotate-[-4deg] bg-[#f4d35e] px-4 py-2 font-hand text-lg paper-shadow-soft">
              make ideas happen
            </div>

            <div className="absolute bottom-8 right-5 z-10 rotate-[4deg] bg-[#faf5eb] px-4 py-3 font-hand text-lg paper-shadow-soft">
              stay curious
              <br />
              keep building ♡
            </div>

            <CharacterScene />
          </div>
        </div>
      </div>
    </section>
  );
}