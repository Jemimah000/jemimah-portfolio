import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import TechStack from "./components/skills/TechStack";
import ProjectGrid from "./components/projects/ProjectGrid";
import LunaAssistant from "./components/ai/LunaAssistant";

import SectionLabel from "./components/common/SectionLabel";

import PageTransition from "./components/effects/PageTransition";
import CursorGlow from "./components/effects/CursorGlow";
import CustomScrollBar from "./components/effects/CustomScrollBar";

import useScrollProgress from "./hooks/useScrollProgress";

function App() {
  const scrollProgress = useScrollProgress();
  const [isLunaVisible, setIsLunaVisible] = useState(false);

  // Start at the top when the portfolio loads.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

// Hide the floating LUNA button only while the LUNA section is visible.
useEffect(() => {
  const lunaSection = document.getElementById("ask-luna");

  if (!lunaSection) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsLunaVisible(entry.isIntersecting);
    },
    {
      threshold: 0,
    }
  );

  observer.observe(lunaSection);

  return () => {
    observer.disconnect();
  };
}, []);

  const goToLuna = () => {
    document.getElementById("ask-luna")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="paper-texture min-h-screen overflow-x-hidden">
      {/* Scroll progress bar */}
      <CustomScrollBar progress={scrollProgress} />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      <main>
        <PageTransition>
          {/* Hero / Profile */}
          <Hero />

          {/* 00 — My Toolbox */}
          <TechStack />

          {/* 01 — Things I've Built */}
          <section
            id="projects"
            className="relative bg-[#f4eee3] px-6 py-28 lg:px-12"
          >
            <SectionLabel number="01">
              Things I've Built
            </SectionLabel>

            <div className="mb-12 max-w-3xl">
              <h2 className="font-display text-5xl md:text-6xl">
                Little ideas that
                <span className="text-[#8c70d0]">
                  {" "}
                  became real.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#19171c]/60">
                A collection of products, experiments and things
                I've built while learning how to turn ideas into
                experiences.
              </p>
            </div>

            <ProjectGrid />
          </section>

          {/* 02 — Who I Am */}
          <About />

          {/* 03 — Meet LUNA */}
          <LunaAssistant />

          {/* Final yellow footer */}
          <Footer />
        </PageTransition>
      </main>

      {/* Floating LUNA button */}
      
          
      {!isLunaVisible && (
        <button
          type="button"
          onClick={goToLuna}
          aria-label="Meet LUNA, your portfolio assistant"
          title="Meet LUNA"
          className="luna-float-button group fixed bottom-5 right-4 z-[60] h-24 w-24 sm:bottom-7 sm:right-7 sm:h-28 sm:w-28"
        >
          <img
            src="/images/luna-orb.png"
            alt=""
            aria-hidden="true"
            className="luna-orb-image h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
          />

          <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-lg border-2 border-[#19171c] bg-[#fff7e8] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#19171c] opacity-0 shadow-[3px_3px_0_#19171c] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2">
            Hey! Meet LUNA ✦
          </span>
        </button>
      )}

    </div>
  );
}

export default App;