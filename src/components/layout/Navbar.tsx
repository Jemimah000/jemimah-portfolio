import {
  Bot,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

import { useState } from "react";

const navigation = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Creative",
    href: "#creative",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-[#1d1b35]/10 bg-[#fff7e8]/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <a
            href="#home"
            className="flex items-center gap-2"
          >
            <span className="font-display text-3xl font-bold">
              Jem
            </span>

            <Sparkles
              size={18}
              className="text-[#7c5ce7]"
            />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#ask-jemi"
              className="flex items-center gap-2 rounded-full border-2 border-[#1d1b35] bg-[#ffd166] px-3 py-2 font-mono text-[9px] shadow-[3px_3px_0_#1d1b35]"
            >
              <Bot size={14} />

              LUNA
            </a>

            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setIsOpen((previous) => !previous)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1d1b35] bg-white"
            >
              {isOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-x-0 top-[73px] z-50 border-b-2 border-[#1d1b35] bg-[#fff7e8] px-5 py-6 shadow-[0_8px_0_rgba(29,27,53,0.12)] lg:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl border border-[#1d1b35]/10 bg-white px-4 py-4 font-display text-xl"
              >
                {item.label}

                <span className="text-[#7c5ce7]">
                  →
                </span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-center rounded-xl border-2 border-[#1d1b35] bg-[#7c5ce7] px-4 py-4 font-mono text-xs text-white shadow-[4px_4px_0_#1d1b35]"
          >
            Let's Connect ✦
          </a>
        </div>
      )}
    </>
  );
}