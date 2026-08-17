import {
  Bot,
  BriefcaseBusiness,
  Camera,
  Code,
  FileText,
  Heart,
  Home,
  Mail,
  Palette,
  Share2,
  User,
  Wrench,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About Me", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: BriefcaseBusiness },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Creative Corner", href: "#creative", icon: Palette },
  { label: "Resume", href: "#contact", icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[230px] flex-col bg-[#19171c] px-5 py-6 text-[#f8f2e8] lg:flex">
      <div>
        <div className="font-hand text-4xl">Jemimah</div>

        <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#9b7ede]">
          DIGITAL CREATIVE
        </div>
      </div>

      <nav className="mt-12 flex flex-col gap-2">
        {navigation.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="group flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-all hover:bg-[#9b7ede]/20 hover:text-white"
          >
            <Icon size={17} strokeWidth={1.7} />
            <span>{label}</span>
          </a>
        ))}

        <a
          href="#ask-jemi"
          className="mt-3 flex items-center gap-3 rounded-md border border-[#9b7ede]/60 bg-[#9b7ede]/15 px-3 py-3 text-sm text-white shadow-[0_0_25px_rgba(155,126,222,0.15)] transition hover:bg-[#9b7ede]/30"
        >
          <Bot size={17} />
          <span>Ask Jemi</span>
          <span className="ml-auto">→</span>
        </a>
      </nav>

      <div className="mt-auto">
        <div className="mb-5 flex gap-3">
          <Code size={17} />
          <Share2 size={17} />
          <Camera size={17} />
          <Mail size={17} />
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="font-mono text-[10px] text-white/50">
            JEMI v1.0
          </div>

          <div className="mt-1 font-hand text-lg text-[#f4d35e]">
            Still becoming...
          </div>

          <div className="mt-3 h-1 rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-[#9b7ede]" />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-white/40">
            <Heart size={12} />
            Made with curiosity
          </div>
        </div>
      </div>
    </aside>
  );
}
