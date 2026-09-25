import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import TechStack from "./components/skills/TechStack";
import CreativeCorner from "./components/creative/CreativeCorner";
import ProjectGrid from "./components/projects/ProjectGrid";
import AskJemi from "./components/ai/AskJemi";

import SectionLabel from "./components/common/SectionLabel";

import FloatingDoodles from "./components/effects/FloatingDoodles";
import PageTransition from "./components/effects/PageTransition";
import CursorGlow from "./components/effects/CursorGlow";

import useScrollProgress from "./hooks/useScrollProgress";

function App() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="paper-texture min-h-screen overflow-x-hidden">
      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[100] h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#8c70d0] via-[#f4d35e] to-[#ef806d] transition-[width] duration-100"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      <CursorGlow />

      {/* Mobile navigation only */}
      <Navbar />

      <FloatingDoodles />

      {/* Full-width portfolio */}
      <main>
        <PageTransition>
          <Hero />

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
                A collection of products, experiments and things I've built
                while learning how to turn ideas into experiences.
              </p>
            </div>

            <ProjectGrid />
          </section>

          <About />

          <TechStack />

          <CreativeCorner />

          <AskJemi />

          <Footer />
        </PageTransition>
      </main>
    </div>
  );
}

export default App;