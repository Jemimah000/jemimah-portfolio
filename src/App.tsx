
import { useEffect } from "react";

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
  // Tracks the percentage of the page scrolled.
  const scrollProgress = useScrollProgress();

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

  return (
    <div className="paper-texture min-h-screen overflow-x-hidden">
      {/* Growing colorful scroll progress bar */}
      <CustomScrollBar progress={scrollProgress} />

      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      <main>
        <PageTransition>
          {/* Hero / Profile */}
          <Hero />

          {/* Projects */}
          <section
            id="projects"
            className="relative bg-[#f4eee3] px-6 py-28 lg:px-12"
          >
            <SectionLabel number="00">
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

          {/* About */}
          <About />

          {/* Skills */}
          <TechStack />

          {/* LUNA AI */}
          <LunaAssistant />

          {/* Footer */}
          <Footer />
        </PageTransition>
      </main>
    </div>
  );
}

export default App;
