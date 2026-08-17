import { ArrowUp, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t-2 border-[#19171c] bg-[#f4d35e] px-6 py-16 lg:px-12"
    >
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em]">
            Have an idea?
          </p>

          <h2 className="mt-3 font-display text-5xl md:text-7xl">
            Let's create.
          </h2>

          <p className="mt-4 font-hand text-2xl">
            Something meaningful. Something fun. Something ours.
          </p>
        </div>

        <a
          href="#home"
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#19171c] transition hover:-translate-y-1"
        >
          <ArrowUp />
        </a>
      </div>

      <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#19171c]/20 pt-5 font-mono text-[10px] md:flex-row">
        <span>© 2026 Jemimah Mary Manuel</span>

        <span className="flex items-center gap-2">
          Made with curiosity <Heart size={11} fill="currentColor" />
        </span>
      </div>
    </footer>
  );
}