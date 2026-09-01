import {
  ArrowUp,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t-2 border-[#1d1b35] bg-[#ffd166] px-6 py-20 lg:px-12"
    >
      {/* Decorative background */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-[#7c5ce7]/15" />

      <div className="absolute bottom-10 left-[10%] font-hand text-7xl text-[#ff8e8e]/30">
        ♥
      </div>

      <div className="absolute right-[12%] top-[20%] animate-wiggle text-5xl text-[#7c5ce7]/30">
        ✦
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          {/* Main text */}

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1d1b35] bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] shadow-[3px_3px_0_#1d1b35]">
              <Sparkles
                size={13}
                className="text-[#7c5ce7]"
              />

              End of the scroll...
            </div>

            <h2 className="mt-7 font-display text-6xl leading-[0.9] tracking-tight md:text-8xl">
              But maybe the
              <span className="block text-[#7c5ce7]">
                beginning of
              </span>

              something cool?
            </h2>

            <p className="mt-7 max-w-xl font-hand text-3xl leading-tight text-[#1d1b35]/80">
              Got an idea, opportunity, project or just
              want to say hi?
            </p>
          </div>

          {/* Contact card */}

          <div className="cartoon-card w-full max-w-sm bg-[#fff7e8] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-[#ff8e8e]">
              <Mail size={20} />
            </div>

            <h3 className="mt-5 font-display text-3xl">
              Let's talk!
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#1d1b35]/60">
              The next interesting idea might start
              with a simple hello.
            </p>

            <a
              href="mailto:your-email@example.com"
              className="mt-6 flex items-center justify-between rounded-full border-2 border-[#1d1b35] bg-[#7c5ce7] px-5 py-3 font-mono text-xs text-white shadow-[4px_4px_0_#1d1b35] transition hover:-translate-x-1 hover:-translate-y-1"
            >
              Send a signal

              <span className="text-lg">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col gap-5 border-t-2 border-[#1d1b35]/15 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#1d1b35]/60">
            © 2026 Jemimah Mary Manuel

            <Heart
              size={12}
              fill="currentColor"
              className="text-[#ff8e8e]"
            />
          </div>

          <div className="flex items-center gap-5">
            <span className="font-hand text-xl text-[#1d1b35]/70">
              Made somewhere between coffee & curiosity.
            </span>

            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-[#fff7e8] shadow-[3px_3px_0_#1d1b35] transition hover:-translate-y-1"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}