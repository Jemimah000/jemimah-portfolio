import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Sparkles,
} from "lucide-react";

import FloatingDoodles from "../effects/FloatingDoodles";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0d1028] px-6 pb-40 pt-10 text-[#f9f3e8] lg:px-12 lg:pt-14"
    >
      <FloatingDoodles />

      {/* =========================
          STAR BACKGROUND
      ========================== */}

      <div className="absolute inset-0 opacity-60">
        <div className="hero-stars" />
      </div>

      {/* Purple glow */}

      <div className="absolute left-[30%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#7c5ce0]/20 blur-[120px]" />

      {/* =========================
          PLANET
      ========================== */}

      <motion.div
        className="absolute left-[48%] top-8 hidden lg:block"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#d5a8ff] to-[#7e5ad6] shadow-[0_0_50px_rgba(174,119,255,0.5)]">
          <div className="absolute -left-7 top-7 h-7 w-36 rotate-[-10deg] rounded-[50%] border-4 border-[#ffd45c]" />
        </div>
      </motion.div>

      {/* =========================
          UFO
      ========================== */}

      <motion.div
        className="absolute right-[8%] top-10 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <div className="mx-auto h-10 w-16 rounded-t-full bg-[#9dd8f5]/70" />

          <div className="h-9 w-28 rounded-[50%] border border-[#d7c9ff] bg-[#9282ba] shadow-[0_0_25px_rgba(170,135,255,0.4)]" />

          <div className="absolute left-1/2 top-[80%] h-20 w-16 -translate-x-1/2 bg-gradient-to-b from-[#f4e685]/30 to-transparent blur-xl" />
        </div>
      </motion.div>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="relative z-10 mx-auto grid min-h-[82vh] max-w-[1500px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          {/* Arrow */}

          <div className="mb-2 hidden lg:block">
            <div className="font-hand text-5xl text-[#b895ff]">
              ⤴
            </div>
          </div>

          {/* Greeting */}

          <p className="font-hand text-3xl text-[#8ee2f0] md:text-4xl">
            Heyy! I'm ♡
          </p>

          {/* Name */}

          <h1 className="relative mt-2 font-display text-[clamp(5rem,10vw,10rem)] font-bold leading-[0.8] tracking-[-0.06em] text-[#f7f1e8]">
            Jemimah
          </h1>

          {/* Role */}

          <motion.div
            className="relative mt-7 inline-block rotate-[-3deg]"
            whileHover={{
              rotate: 0,
              scale: 1.04,
            }}
          >
            <div className="rounded-sm bg-[#ffd65f] px-6 py-2 font-hand text-2xl text-[#171426] shadow-[5px_5px_0_rgba(255,255,255,0.15)]">
              Developer. Designer. Dreamer.
            </div>
          </motion.div>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#f7f1e8]/80 md:text-xl">
            I build digital experiences where
            <br />
            technology meets{" "}
            <span className="font-semibold text-[#c6a8ff]">
              creativity.
            </span>
          </p>

          {/* Buttons */}

          <div className="mt-9 flex flex-wrap gap-4">
            {/* Explore My Work */}

            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#8058d6] px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(112,76,200,0.45)] transition hover:-translate-y-1 hover:bg-[#916cff]"
            >
              Explore My Work

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            {/* Download CV */}

            <a
              href="/resume.pdf"
              download="Jemimah_Mary_Manuel_CV.pdf"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/50 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
            >
              Download CV

              <Download
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>

          {/* Scroll */}

          <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            <ArrowDown size={15} />
            Scroll to explore
          </div>
        </motion.div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <motion.div
          className="relative flex min-h-[580px] items-center justify-center"
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
        >
          {/* Outer glow */}

          <div className="absolute h-[470px] w-[470px] rounded-full bg-[#9b72ed]/30 blur-[90px]" />

          {/* Portal */}

          <motion.div
            className="relative h-[540px] w-[400px] overflow-hidden rounded-[190px_190px_35px_35px] border-[8px] border-[#8f69d3] bg-gradient-to-b from-[#ffd55f] via-[#f6c862] to-[#8b5fd0] shadow-[0_0_50px_rgba(143,105,211,0.6)]"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner glow */}

            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#1d1740]/30" />

            {/* Crown */}

            <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 text-5xl text-white">
              ♕
            </div>

            {/* Photo */}

            <img
              src="/images/profile/jemimah.png"
              alt="Jemimah Mary Manuel"
              className="absolute bottom-0 left-1/2 z-10 h-[480px] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.35)]"
            />
          </motion.div>

          {/* Left sticky note */}

          <motion.div
            className="absolute bottom-20 left-0 z-30 hidden rotate-[-7deg] bg-[#fff0bd] px-6 py-5 text-[#171426] shadow-[6px_6px_0_rgba(0,0,0,0.18)] lg:block"
            animate={{
              rotate: [-7, -4, -7],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="font-hand text-xl">
              code. create.
              <br />
              inspire :)
            </p>
          </motion.div>

          {/* Right speech bubble */}

          <motion.div
            className="absolute right-[-25px] top-24 z-30 hidden rotate-[7deg] rounded-xl border-2 border-[#d9cba9] bg-[#fff6dc] px-6 py-5 text-[#171426] shadow-[5px_5px_0_rgba(0,0,0,0.18)] lg:block"
            animate={{
              rotate: [7, 4, 7],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="font-hand text-lg">
              Building ideas
              <br />
              with logic &
              <br />
              imagination ♡
            </p>
          </motion.div>

          {/* Decorative stars */}

          <Sparkles className="absolute -left-5 top-[18%] text-[#ffd65f]" />

          <div className="absolute right-2 bottom-20 text-4xl text-[#f6a0c0]">
            ✿
          </div>
        </motion.div>
      </div>

      {/* =========================
          CURVED BOTTOM TRANSITION
      ========================== */}

      <div className="absolute bottom-0 left-0 h-32 w-full overflow-hidden">
        <div className="absolute -bottom-24 left-[-5%] h-48 w-[110%] rounded-t-[50%] bg-[#f4eee3]" />
      </div>
    </section>
  );
}