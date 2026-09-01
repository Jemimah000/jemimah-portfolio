import {
  Bot,
  BriefcaseBusiness,
  Code2,
  FileText,
  Heart,
  Home,
  Mail,
  Palette,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";

const navigation = [
  {
    label: "Home",
    href: "#home",
    icon: Home,
  },
  {
    label: "About Me",
    href: "#about",
    icon: User,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: BriefcaseBusiness,
  },
  {
    label: "Skills",
    href: "#skills",
    icon: Wrench,
  },
  {
    label: "Creative Corner",
    href: "#creative",
    icon: Palette,
  },
  {
    label: "Resume",
    href: "#contact",
    icon: FileText,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] flex-col overflow-hidden border-r-2 border-[#1d1b35] bg-[#1d1b35] px-5 py-6 text-[#fff7e8] lg:flex">
      {/* Decorative circles */}

      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7c5ce7]/30 blur-2xl" />

      <div className="absolute bottom-20 -left-10 h-28 w-28 rounded-full bg-[#ff8e8e]/20 blur-2xl" />

      {/* Logo */}

      <div className="relative">
        <a href="#home">
          <div className="flex items-center gap-2">
            <span className="font-display text-4xl font-bold tracking-tight">
              Jem
            </span>

            <span className="animate-gentle-bounce text-xl">
              ✦
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <div className="h-[1px] w-5 bg-[#ffd166]" />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffd166]">
              Digital Universe
            </span>
          </div>
        </a>
      </div>

      {/* Small status */}

      <div className="relative mt-8 rounded-[18px] border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6ed3cf] opacity-70" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6ed3cf]" />
          </span>

          <span className="font-mono text-[9px] uppercase tracking-wider text-white/60">
            Currently creating
          </span>
        </div>

        <p className="mt-2 font-hand text-xl text-[#fff7e8]">
          ideas → pixels → magic
        </p>
      </div>

      {/* Navigation */}

      <nav className="relative mt-8 flex flex-col gap-1">
        {navigation.map(
          ({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/65 transition-all duration-200 hover:translate-x-1 hover:bg-white/10 hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 transition group-hover:bg-[#7c5ce7]">
                <Icon
                  size={15}
                  strokeWidth={2}
                />
              </span>

              <span>{label}</span>

              <span className="ml-auto opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </a>
          ),
        )}
      </nav>

      {/* LUNA Button */}

      <a
        href="#ask-jemi"
        className="relative mt-5 flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-[#7c5ce7] bg-[#7c5ce7]/20 px-3 py-3 text-sm text-white transition hover:-translate-y-1 hover:bg-[#7c5ce7]/35"
      >
        <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[#ffd166]/20 blur-xl" />

        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd166] text-[#1d1b35]">
          <Bot size={16} />
        </span>

        <div className="relative">
          <div className="font-medium">
            Meet LUNA
          </div>

          <div className="font-mono text-[8px] uppercase tracking-wider text-white/50">
            Jem's guide
          </div>
        </div>

        <Sparkles
          size={15}
          className="relative ml-auto text-[#ffd166]"
        />
      </a>

      {/* Bottom */}

      <div className="relative mt-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-[#ffd166]">
            <Code2 size={15} />

            <span className="font-mono text-[9px] uppercase tracking-wider">
              Jem v2.0
            </span>
          </div>

          <p className="mt-3 font-hand text-xl leading-none text-white">
            Still learning.
            <br />
            Still dreaming.
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-linear-to-r from-[#7c5ce7] to-[#ff8e8e]" />
          </div>

          <div className="mt-4 flex items-center gap-2 font-mono text-[9px] text-white/40">
            <Heart
              size={12}
              className="text-[#ff8e8e]"
              fill="currentColor"
            />

            Made with curiosity
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1 text-white/40">
          <Mail size={15} />

          <span className="font-mono text-[8px]">
            © 2026 JEM
          </span>
        </div>
      </div>
    </aside>
  );
}